-- +goose Up
-- +goose StatementBegin
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    source_id INT UNIQUE NOT NULL,
    name TEXT,
    position TEXT,
    market_value INT,
    profile_image_url_source TEXT,
    field_image_url_source TEXT,
    profile_image TEXT,
    field_image TEXT,
    slug TEXT UNIQUE,
    current_team_id INT,
    CONSTRAINT fk_players_current_team FOREIGN KEY(current_team_id) REFERENCES teams(id)
);

CREATE TABLE player_statistics (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    player_id INT,
    year INT,
    team_id INT,
    stats JSONB,
    percentiles JSONB,
    CONSTRAINT fk_statistics_player FOREIGN KEY(player_id) REFERENCES players(id),
    CONSTRAINT fk_statistics_team FOREIGN KEY(team_id) REFERENCES teams(id),
    UNIQUE (player_id, year, team_id)
);

CREATE TABLE match_histories (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ,
    player_id INT,
    gameweek TEXT,
    date TEXT,
    home_team TEXT,
    away_team TEXT,
    score TEXT,
    performance_data JSONB,
    CONSTRAINT fk_match_histories_player FOREIGN KEY(player_id) REFERENCES players(id),
    UNIQUE (player_id, gameweek, date)
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE match_histories;
DROP TABLE player_statistics;
DROP TABLE players;
DROP TABLE teams;
-- +goose StatementEnd
