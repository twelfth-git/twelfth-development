package models

import "gorm.io/gorm"

type Team struct {
	gorm.Model
	Name     string   `gorm:"unique;not null"`
	Slug     string   `gorm:"unique;not null"`
	ImageURL string   `gorm:"column:image_url"`
	Players  []Player `gorm:"foreignKey:CurrentTeamID"`
}

type Player struct {
	gorm.Model
	SourceID              int `gorm:"unique;not null"`
	Name                  string
	Position              string
	MarketValue           int
	ProfileImageURLSource string
	FieldImageURLSource   string
	ProfileImage          string
	FieldImage            string
	Slug                  string `gorm:"unique"`
	CurrentTeamID         *uint
	Statistics            []PlayerStatistic `gorm:"foreignKey:PlayerID"`
	CurrentTeam           Team              `gorm:"foreignKey:CurrentTeamID"`
	MatchHistory          []MatchHistory    `gorm:"foreignKey:PlayerID"`
}

type PlayerStatistic struct {
	gorm.Model
	PlayerID    uint   `gorm:"uniqueIndex:idx_player_year_team"`
	Year        int    `gorm:"uniqueIndex:idx_player_year_team"`
	TeamID      *uint  `gorm:"uniqueIndex:idx_player_year_team"`
	Stats       string `gorm:"type:jsonb"`
	Percentiles string `gorm:"type:jsonb"`
	Team        Team   `gorm:"foreignKey:TeamID"`
}

type MatchHistory struct {
	gorm.Model
	PlayerID        uint   `gorm:"uniqueIndex:idx_player_gameweek_date"`
	Gameweek        string `gorm:"uniqueIndex:idx_player_gameweek_date"`
	Date            string `gorm:"uniqueIndex:idx_player_gameweek_date"`
	HomeTeam        string
	AwayTeam        string
	Score           string
	PerformanceData string `gorm:"type:jsonb"`
}
