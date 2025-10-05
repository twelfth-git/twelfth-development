// src/types/match.ts
export interface Team {
  id: number;
  name: string;
}

export interface StatsAndFeatures {
  player_id: number;
  team_id: number;
  shirtNumber: number;
  position: string;
  minsPlayed?: number;
  goals?: number;
  // Adicione outros campos de estatísticas que você for usar
}

export interface PlayerRating {
  player_id: number;
  knownName: string | null;
  matchName: string;
  our_rating: number;
  stats_and_features: StatsAndFeatures;
}

export interface Match {
  match_id: string;
  description: string;
  date: string; // Formato ISO 8601 (ex: "2025-09-20Z")
  home_team: Team;
  away_team: Team;
  home_team_logo: string; // Adicionado do nosso backend
  away_team_logo: string; // Adicionado do nosso backend
  venue: string;
  player_ratings: PlayerRating[];
}