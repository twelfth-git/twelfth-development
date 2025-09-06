package handlers

import (
	"encoding/json"
	"net/http"
	"twelfth/backend/internal/database"
	"twelfth/backend/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PlayerSummaryResponse struct {
	Name     string `json:"name"`
	Position string `json:"position"`
	Slug     string `json:"slug"`
}

type TeamDetailResponse struct {
	ID       uint                    `json:"id"`
	Name     string                  `json:"name"`
	Slug     string                  `json:"slug"`
	ImageURL string                  `json:"image_url"`
	Players  []PlayerSummaryResponse `json:"players"`
}

type TeamSummaryForPlayerResponse struct {
	Name     string `json:"name"`
	Slug     string `json:"slug"`
	ImageURL string `json:"image_url"`
}

type StatisticResponse struct {
	Year        int                    `json:"year"`
	TeamName    string                 `json:"team_name"`
	Stats       map[string]interface{} `json:"stats"`
	Percentiles []interface{}          `json:"percentiles"`
}

type MatchHistoryResponse struct {
	Gameweek          string                 `json:"gameweek"`
	Date              string                 `json:"date"`
	HomeTeam          string                 `json:"home_team"`
	HomeTeamImageURL  string                 `json:"home_team_image_url"`
	AwayTeam          string                 `json:"away_team"`
	AwayTeamImageURL  string                 `json:"away_team_image_url"`
	Score             string                 `json:"score"`
	PlayerPerformance map[string]interface{} `json:"player_performance"`
}

type PlayerDetailResponse struct {
	ID           uint                         `json:"id"`
	Name         string                       `json:"name"`
	Position     string                       `json:"position"`
	MarketValue  int                          `json:"market_value"`
	ProfileImage string                       `json:"profile_image"`
	Slug         string                       `json:"slug"`
	CurrentTeam  TeamSummaryForPlayerResponse `json:"current_team"`
	Statistics   []StatisticResponse          `json:"statistics"`
	MatchHistory []MatchHistoryResponse       `json:"match_history"`
}

func GetTeamBySlug(c *gin.Context) {
	slug := c.Param("slug")
	var team models.Team

	err := database.DB.Preload("Players").Where("slug = ?", slug).First(&team).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"detail": "Time não encontrado."})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro interno no servidor."})
		return
	}

	var playerSummaries []PlayerSummaryResponse
	for _, player := range team.Players {
		playerSummaries = append(playerSummaries, PlayerSummaryResponse{
			Name:     player.Name,
			Position: player.Position,
			Slug:     player.Slug,
		})
	}

	response := TeamDetailResponse{
		ID:       team.ID,
		Name:     team.Name,
		Slug:     team.Slug,
		ImageURL: team.ImageURL,
		Players:  playerSummaries,
	}
	c.JSON(http.StatusOK, response)
}

func GetPlayerByID(c *gin.Context) {
	id := c.Param("id")
	var player models.Player

	err := database.DB.
		Preload("CurrentTeam").
		Preload("Statistics.Team").
		Preload("MatchHistory").
		Where("id = ?", id).
		First(&player).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"detail": "Jogador não encontrado."})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro interno no servidor."})
		return
	}

	var statsResponse []StatisticResponse
	for _, stat := range player.Statistics {
		var statsData map[string]interface{}
		var percentilesData []interface{}
		json.Unmarshal([]byte(stat.Stats), &statsData)
		json.Unmarshal([]byte(stat.Percentiles), &percentilesData)

		statsResponse = append(statsResponse, StatisticResponse{
			Year:        stat.Year,
			TeamName:    stat.Team.Name,
			Stats:       statsData,
			Percentiles: percentilesData,
		})
	}

	var matchHistoryResponse []MatchHistoryResponse
	if len(player.MatchHistory) > 0 {

		teamNamesSet := make(map[string]bool)
		for _, match := range player.MatchHistory {
			teamNamesSet[match.HomeTeam] = true
			teamNamesSet[match.AwayTeam] = true
		}
		var namesList []string
		for name := range teamNamesSet {
			namesList = append(namesList, name)
		}

		var teams []models.Team
		database.DB.Where("name IN ?", namesList).Find(&teams)

		teamImageMap := make(map[string]string)
		for _, team := range teams {
			teamImageMap[team.Name] = team.ImageURL
		}

		for _, match := range player.MatchHistory {
			var performanceData map[string]interface{}
			json.Unmarshal([]byte(match.PerformanceData), &performanceData)

			matchHistoryResponse = append(matchHistoryResponse, MatchHistoryResponse{
				Gameweek:          match.Gameweek,
				Date:              match.Date,
				HomeTeam:          match.HomeTeam,
				HomeTeamImageURL:  teamImageMap[match.HomeTeam],
				AwayTeam:          match.AwayTeam,
				AwayTeamImageURL:  teamImageMap[match.AwayTeam],
				Score:             match.Score,
				PlayerPerformance: performanceData,
			})
		}
	}

	response := PlayerDetailResponse{
		ID:           player.ID,
		Name:         player.Name,
		Position:     player.Position,
		MarketValue:  player.MarketValue,
		ProfileImage: player.ProfileImage,
		Slug:         player.Slug,
		CurrentTeam: TeamSummaryForPlayerResponse{
			Name:     player.CurrentTeam.Name,
			Slug:     player.CurrentTeam.Slug,
			ImageURL: player.CurrentTeam.ImageURL,
		},
		Statistics:   statsResponse,
		MatchHistory: matchHistoryResponse,
	}

	c.JSON(http.StatusOK, response)
}
