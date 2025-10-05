// internal/handlers/player_handler.go
package handlers

import (
	"net/http"
	"pedra90z/go-backend/internal/data"
	"strconv"

	"github.com/gin-gonic/gin"
)

// NewPlayerHandler cria um handler para buscar um jogador específico pelo ID.
func NewPlayerHandler(playerDataMap map[int]data.PlayerData) gin.HandlerFunc {
	return func(c *gin.Context) {
		playerIDStr := c.Param("id")
		playerID, err := strconv.Atoi(playerIDStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ID de jogador inválido"})
			return
		}

		if playerData, ok := playerDataMap[playerID]; ok {
			c.JSON(http.StatusOK, playerData)
			return
		}

		c.JSON(http.StatusNotFound, gin.H{"error": "Jogador não encontrado"})
	}
}
