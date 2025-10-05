package handlers

import (
	"net/http"
	"strings"

	"pedra90z/go-backend/internal/data"
	"pedra90z/go-backend/internal/models"

	"github.com/gin-gonic/gin"
)

// ALTERADO: A assinatura da função agora aceita o playerDataMap.
func NewTeamHandler(matches []models.Match, teamDataMap map[int]data.TeamData, playerDataMap map[int]data.PlayerData) gin.HandlerFunc {
	return func(c *gin.Context) {
		teamNameParam := strings.ToLower(c.Param("teamName"))

		var teamProfile models.TeamProfile
		foundPlayers := make(map[int]models.PlayerInfo)
		foundMatchIDs := make(map[string]struct{})
		teamFound := false
		var identifiedTeamID int

		for _, match := range matches {
			var currentTeam models.Team
			if strings.ToLower(match.HomeTeam.Name) == teamNameParam {
				currentTeam = match.HomeTeam
			} else if strings.ToLower(match.AwayTeam.Name) == teamNameParam {
				currentTeam = match.AwayTeam
			} else {
				continue
			}

			if !teamFound {
				teamFound = true
				identifiedTeamID = currentTeam.ID
			}
			foundMatchIDs[match.MatchID] = struct{}{}

			for _, player := range match.PlayerRatings {
				if player.StatsAndFeatures.TeamID == identifiedTeamID {
					if _, ok := foundPlayers[player.PlayerID]; !ok {

						// NOVO: Monta a struct do jogador e busca a imagem no mapa.
						playerInfo := models.PlayerInfo{
							PlayerID:  player.PlayerID,
							KnownName: player.KnownName,
							MatchName: player.MatchName,
						}
						// Adiciona a imagem do jogador se ela existir no mapa.
						if playerData, ok := playerDataMap[player.PlayerID]; ok {
							playerInfo.PlayerImage = playerData.PlayerImg
						}
						foundPlayers[player.PlayerID] = playerInfo
					}
				}
			}
		}

		if !teamFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Time não encontrado"})
			return
		}

		if details, ok := teamDataMap[identifiedTeamID]; ok {
			teamProfile.TeamID = details.OurID
			teamProfile.TeamName = details.Name
			teamProfile.LogoURL = details.LogoURL
		}

		for matchID := range foundMatchIDs {
			teamProfile.MatchIDs = append(teamProfile.MatchIDs, matchID)
		}
		for _, player := range foundPlayers {
			teamProfile.Players = append(teamProfile.Players, player)
		}

		c.JSON(http.StatusOK, teamProfile)
	}
}
