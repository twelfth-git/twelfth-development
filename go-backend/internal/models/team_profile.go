package models

// PlayerInfo é uma estrutura simplificada para a lista de jogadores de um time.
type PlayerInfo struct {
	PlayerID    int     `json:"player_id"`
	KnownName   *string `json:"knownName"`
	MatchName   string  `json:"matchName"`
	PlayerImage string  `json:"player_image,omitempty"` // NOVO CAMPO
}

// TeamProfile é a estrutura completa que será retornada pela API para um time específico.
type TeamProfile struct {
	TeamID   int          `json:"team_id"`
	TeamName string       `json:"team_name"`
	LogoURL  string       `json:"logo_url"`
	MatchIDs []string     `json:"match_ids"`
	Players  []PlayerInfo `json:"players"`
}
