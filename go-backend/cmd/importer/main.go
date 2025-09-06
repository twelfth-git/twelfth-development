package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"twelfth/backend/internal/database"
	"twelfth/backend/internal/models"

	"github.com/gosimple/slug"
)

type JSONTeamInfo struct {
	Name string `json:"name"`
}
type JSONPlayerInfo struct {
	ID          int          `json:"id"`
	Name        string       `json:"name"`
	Position    string       `json:"position"`
	Team        JSONTeamInfo `json:"team"`
	MarketValue int          `json:"marketValue"`
	Image       string       `json:"image"`
	FieldImg    string       `json:"fieldImg"`
}
type JSONPercentileDetail struct {
	Statistic  string  `json:"statistic"`
	Per90      string  `json:"per90"`
	Percentile float64 `json:"percentile"`
}
type JSONStatisticEntry struct {
	Year        string                 `json:"year"`
	Team        JSONTeamInfo           `json:"team"`
	Statistics  map[string]interface{} `json:"statistics"`
	Percentiles []JSONPercentileDetail `json:"detailedStatsPercentiles"`
}
type JSONMatchHistoryEntry struct {
	Gameweek          string                 `json:"gameweek"`
	Date              string                 `json:"date"`
	HomeTeam          string                 `json:"home_team"`
	AwayTeam          string                 `json:"away_team"`
	Score             string                 `json:"score"`
	PlayerPerformance map[string]interface{} `json:"player_performance"`
}
type JSONPlayerEntry struct {
	Player       JSONPlayerInfo          `json:"player"`
	Statistics   []JSONStatisticEntry    `json:"statistics"`
	MatchHistory []JSONMatchHistoryEntry `json:"match_history"`
}

func findOrCreateTeam(name string, imageMap map[string]string) models.Team {
	var team models.Team
	database.DB.FirstOrCreate(&team, models.Team{Name: name})

	updates := make(map[string]interface{})

	if team.Slug == "" {
		updates["Slug"] = slug.Make(name)
	}
	if team.ImageURL == "" {
		if url, ok := imageMap[name]; ok {
			updates["ImageURL"] = url
		}
	}

	if len(updates) > 0 {
		database.DB.Model(&team).Updates(updates)
	}
	return team
}

func main() {
	fmt.Println("Iniciando script de importação completo...")
	database.Connect()

	teamImageMap := map[string]string{
		"Flamengo":            "https://img.sofascore.com/api/v1/team/5981/image",
		"Cruzeiro":            "https://img.sofascore.com/api/v1/team/1954/image",
		"Palmeiras":           "https://img.sofascore.com/api/v1/team/1963/image",
		"Bahia":               "https://img.sofascore.com/api/v1/team/1955/image",
		"Botafogo (RJ)":       "https://img.sofascore.com/api/v1/team/1958/image",
		"Botafogo":            "https://img.sofascore.com/api/v1/team/1958/image",
		"Mirassol":            "https://img.sofascore.com/api/v1/team/21982/image",
		"São Paulo":           "https://img.sofascore.com/api/v1/team/1981/image",
		"Red Bull Bragantino": "https://img.sofascore.com/api/v1/team/1999/image",
		"Bragantino":          "https://img.sofascore.com/api/v1/team/1999/image",
		"RB Bragantino":       "https://img.sofascore.com/api/v1/team/1999/image",
		"Fluminense":          "https://img.sofascore.com/api/v1/team/1961/image",
		"Internacional":       "https://img.sofascore.com/api/v1/team/1966/image",
		"Ceará":               "https://img.sofascore.com/api/v1/team/2001/image",
		"Corinthians":         "https://img.sofascore.com/api/v1/team/1957/image",
		"Grêmio":              "https://img.sofascore.com/api/v1/team/5926/image",
		"Atlético Mineiro":    "https://img.sofascore.com/api/v1/team/1977/image",
		"Atlético-MG":         "https://img.sofascore.com/api/v1/team/1977/image",
		"Vasco da Gama":       "https://img.sofascore.com/api/v1/team/1974/image",
		"Vasco":               "https://img.sofascore.com/api/v1/team/1974/image",
		"Santos":              "https://img.sofascore.com/api/v1/team/1968/image",
		"Vitória":             "https://img.sofascore.com/api/v1/team/1962/image",
		"Juventude":           "https://img.sofascore.com/api/v1/team/1980/image",
		"Fortaleza":           "https://img.sofascore.com/api/v1/team/2020/image",
		"Sport Recife":        "https://img.sofascore.com/api/v1/team/1959/image",
	}

	filePath := "data/jogadores_com_historico_completo_e_media.json"
	file, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("ERRO FATAL: Não foi possível ler o arquivo JSON: %v", err)
	}

	var playerEntries []JSONPlayerEntry
	err = json.Unmarshal(file, &playerEntries)
	if err != nil {
		log.Fatalf("ERRO FATAL: Falha ao decodificar o arquivo JSON: %v", err)
	}

	fmt.Printf("Sucesso! Encontrados %d jogadores no arquivo. Iniciando processamento...\n", len(playerEntries))

	for _, entry := range playerEntries {

		teamModel := findOrCreateTeam(entry.Player.Team.Name, teamImageMap)

		playerModel := models.Player{}
		database.DB.FirstOrCreate(&playerModel, models.Player{SourceID: entry.Player.ID})
		playerModel.Name = entry.Player.Name
		playerModel.Position = entry.Player.Position
		playerModel.MarketValue = entry.Player.MarketValue
		playerModel.CurrentTeamID = &teamModel.ID
		playerModel.ProfileImageURLSource = entry.Player.Image
		playerModel.FieldImageURLSource = entry.Player.FieldImg
		if playerModel.Slug == "" {
			playerModel.Slug = slug.Make(fmt.Sprintf("%s-%d", entry.Player.Name, entry.Player.ID))
		}
		database.DB.Save(&playerModel)
		fmt.Printf("\nProcessando jogador: %s (ID do DB: %d)\n", playerModel.Name, playerModel.ID)

		for _, statEntry := range entry.Statistics {
			yearInt, err := strconv.Atoi(statEntry.Year)
			if err != nil {
				fmt.Printf("  AVISO: Ano inválido ('%s'). Pulando.\n", statEntry.Year)
				continue
			}
			statsJSON, _ := json.Marshal(statEntry.Statistics)
			percentilesJSON, _ := json.Marshal(statEntry.Percentiles)

			statTeamModel := findOrCreateTeam(statEntry.Team.Name, teamImageMap)

			dataToUpdateStats := models.PlayerStatistic{
				TeamID:      &statTeamModel.ID,
				Stats:       string(statsJSON),
				Percentiles: string(percentilesJSON),
			}
			searchKeyStats := models.PlayerStatistic{
				PlayerID: playerModel.ID,
				Year:     yearInt,
				TeamID:   &statTeamModel.ID,
			}
			statisticModel := models.PlayerStatistic{}
			database.DB.Assign(dataToUpdateStats).FirstOrCreate(&statisticModel, searchKeyStats)
		}
		fmt.Printf("  -> Estatísticas de carreira processadas.\n")

		for _, matchEntry := range entry.MatchHistory {

			findOrCreateTeam(matchEntry.HomeTeam, teamImageMap)
			findOrCreateTeam(matchEntry.AwayTeam, teamImageMap)

			performanceJSON, _ := json.Marshal(matchEntry.PlayerPerformance)
			dataToUpdateMatch := models.MatchHistory{
				HomeTeam:        matchEntry.HomeTeam,
				AwayTeam:        matchEntry.AwayTeam,
				Score:           matchEntry.Score,
				PerformanceData: string(performanceJSON),
			}
			searchKeyMatch := models.MatchHistory{
				PlayerID: playerModel.ID,
				Gameweek: matchEntry.Gameweek,
				Date:     matchEntry.Date,
			}
			matchModel := models.MatchHistory{}
			database.DB.Assign(dataToUpdateMatch).FirstOrCreate(&matchModel, searchKeyMatch)
		}
		fmt.Printf("  -> Histórico de %d partidas processado.\n", len(entry.MatchHistory))
	}

	fmt.Println("\nScript de importação finalizado com sucesso!")
}
