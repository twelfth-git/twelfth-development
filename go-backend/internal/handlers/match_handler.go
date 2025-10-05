package handlers

import (
	"net/http"
	"pedra90z/go-backend/internal/data"
	"pedra90z/go-backend/internal/models"

	"github.com/gin-gonic/gin"
)

// ALTERADO: A assinatura da função agora aceita o terceiro argumento playerDataMap.
func NewMatchHandler(matches []models.Match, teamDataMap map[int]data.TeamData, playerDataMap map[int]data.PlayerData) gin.HandlerFunc {
	return func(c *gin.Context) {
		matchID := c.Param("id")

		for _, match := range matches {
			if match.MatchID == matchID {
				// Cria uma cópia da partida para podermos adicionar as imagens sem alterar os dados originais.
				matchCopy := match

				// NOVO: Itera sobre os player ratings para adicionar a imagem de cada jogador.
				for i, rating := range matchCopy.PlayerRatings {
					if playerData, ok := playerDataMap[rating.PlayerID]; ok {
						// Adiciona a URL da imagem no campo que criamos na struct.
						matchCopy.PlayerRatings[i].PlayerImage = playerData.PlayerImg
					}
				}

				// O restante da lógica para os logos dos times continua igual.
				type MatchResponse struct {
					models.Match
					HomeTeamLogo string `json:"home_team_logo"`
					AwayTeamLogo string `json:"away_team_logo"`
				}

				response := MatchResponse{
					Match:        matchCopy, // Usa a cópia modificada com as imagens dos jogadores.
					HomeTeamLogo: "https://via.placeholder.com/150",
					AwayTeamLogo: "https://via.placeholder.com/150",
				}

				if details, ok := teamDataMap[match.HomeTeam.ID]; ok {
					response.HomeTeamLogo = details.LogoURL
				}
				if details, ok := teamDataMap[match.AwayTeam.ID]; ok {
					response.AwayTeamLogo = details.LogoURL
				}

				c.JSON(http.StatusOK, response)
				return
			}
		}

		c.JSON(http.StatusNotFound, gin.H{"error": "Partida não encontrada"})
	}
}
