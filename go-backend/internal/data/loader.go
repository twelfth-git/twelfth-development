package data

import (
	"encoding/json"
	"os"
	"pedra90z/go-backend/internal/models"
)

// TeamData representa a estrutura de cada objeto no seu teams.json
type TeamData struct {
	OurID   int    `json:"our_id"`
	ApiID   string `json:"api_id"`
	Name    string `json:"name"`
	LogoURL string `json:"logoUrl"`
}

// NOVO: PlayerData representa a estrutura de cada objeto em players_db.json
type PlayerData struct {
	OurID     int    `json:"our_id"`
	ApiID     string `json:"api_id"`
	Name      string `json:"name"`
	TeamName  string `json:"team_name"`
	FieldImg  string `json:"field_img"`
	PlayerImg string `json:"player_img"`
}

// LoadMatches não muda, continua igual.
func LoadMatches(filePath string) ([]models.Match, error) {
	jsonData, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	var matches []models.Match
	if err := json.Unmarshal(jsonData, &matches); err != nil {
		return nil, err
	}
	return matches, nil
}

// LoadTeamData carrega os detalhes dos times do seu teams.json para uma lista
func LoadTeamData(filePath string) ([]TeamData, error) {
	jsonData, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var teamDataList []TeamData
	if err := json.Unmarshal(jsonData, &teamDataList); err != nil {
		return nil, err
	}

	return teamDataList, nil
}

// NOVO: LoadTeamsToMap carrega os times e os retorna como um mapa para performance
func LoadTeamsToMap(filePath string) (map[int]TeamData, error) {
	teams, err := LoadTeamData(filePath)
	if err != nil {
		return nil, err
	}

	teamMap := make(map[int]TeamData)
	for _, team := range teams {
		teamMap[team.OurID] = team
	}
	return teamMap, nil
}

// NOVO: LoadPlayersToMap carrega os dados de players_db.json e os organiza em um mapa por ID.
func LoadPlayersToMap(filePath string) (map[int]PlayerData, error) {
	jsonData, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var players []PlayerData
	if err := json.Unmarshal(jsonData, &players); err != nil {
		return nil, err
	}

	playerMap := make(map[int]PlayerData)
	for _, player := range players {
		playerMap[player.OurID] = player
	}

	return playerMap, nil
}
