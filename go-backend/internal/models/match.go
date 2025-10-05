package models

// Match representa uma única partida.
type Match struct {
	MatchID       string         `json:"match_id"`
	Description   string         `json:"description"`
	Week          string         `json:"week"`
	Date          string         `json:"date"`
	HomeTeam      Team           `json:"home_team"`
	AwayTeam      Team           `json:"away_team"`
	Venue         string         `json:"venue"`
	Referee       string         `json:"referee"`
	PlayerRatings []PlayerRating `json:"player_ratings"`
	CommentaryRaw []Commentary   `json:"commentary_raw"`
}

// Team é uma struct reutilizável para ambos os times.
type Team struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

// PlayerRating representa a avaliação e as estatísticas de um jogador.
type PlayerRating struct {
	PlayerID         int              `json:"player_id"`
	KnownName        *string          `json:"knownName"`
	MatchName        string           `json:"matchName"`
	OurRating        float64          `json:"our_rating"`
	StatsAndFeatures StatsAndFeatures `json:"stats_and_features"`
	PlayerImage      string           `json:"player_image,omitempty"` // NOVO CAMPO
}

// Commentary representa um único evento da narração da partida.
type Commentary struct {
	ID        string `json:"id"`
	Comment   string `json:"comment"`
	Timestamp string `json:"timestamp"`
	Minute    string `json:"minute,omitempty"`
	Period    string `json:"period,omitempty"`
	Type      string `json:"type"`
}

// StatsAndFeatures UNIFICADA.
type StatsAndFeatures struct {
	PlayerID           int     `json:"player_id"`
	TeamID             int     `json:"team_id"`
	ShirtNumber        int     `json:"shirtNumber"`
	Position           string  `json:"position"`
	PositionSide       *string `json:"positionSide"`
	MinsPlayed         int     `json:"minsPlayed,omitempty"`
	Goals              int     `json:"goals,omitempty"`
	Saves              int     `json:"saves,omitempty"`
	Touches            int     `json:"touches,omitempty"`
	TotalPass          int     `json:"totalPass,omitempty"`
	AccuratePass       int     `json:"accuratePass,omitempty"`
	TotalLongBalls     int     `json:"totalLongBalls,omitempty"`
	AccurateLongBalls  int     `json:"accurateLongBalls,omitempty"`
	TotalCross         int     `json:"totalCross,omitempty"`
	AccurateCross      int     `json:"accurateCross,omitempty"`
	TotalTackle        int     `json:"totalTackle,omitempty"`
	WonTackle          int     `json:"wonTackle,omitempty"`
	DuelWon            int     `json:"duelWon,omitempty"`
	DuelLost           int     `json:"duelLost,omitempty"`
	AerialWon          int     `json:"aerialWon,omitempty"`
	AerialLost         int     `json:"aerialLost,omitempty"`
	TotalScoringAtt    int     `json:"totalScoringAtt,omitempty"`
	ShotOffTarget      int     `json:"shotOffTarget,omitempty"`
	OntargetScoringAtt int     `json:"ontargetScoringAtt,omitempty"`
	BlockedScoringAtt  int     `json:"blockedScoringAtt,omitempty"`
	BigChanceCreated   int     `json:"bigChanceCreated,omitempty"`
	Assists            int     `json:"assists,omitempty"`
	YellowCard         int     `json:"yellowCard,omitempty"`
	RedCard            int     `json:"redCard,omitempty"`
	FormationPlace     int     `json:"formationPlace,omitempty"`
	// ...
}
