import {
  CalendarBlankIcon,
  MapTrifoldIcon,
  StarIcon,
} from "@phosphor-icons/react";
import React from "react";
import { Match } from "@/types/match";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MatchScorecard({ match }: { match: Match }) {
  // A lógica para calcular o placar e formatar a data permanece a mesma
  const calculateScore = (teamId: number) => {
    return match.player_ratings.reduce((score, player) => {
      if (
        player.stats_and_features.team_id === teamId &&
        player.stats_and_features.goals
      ) {
        return score + player.stats_and_features.goals;
      }
      return score;
    }, 0);
  };

  const homeScore = calculateScore(match.home_team.id);
  const awayScore = calculateScore(match.away_team.id);

  const formattedDate = format(new Date(match.date), "dd/MM/yyyy · HH:mm", {
    locale: ptBR,
  });

  return (
    <div className="w-full bg-[linear-gradient(90deg,#060606_0%,#151515_100%)] rounded-lg border border-lines p-4 flex flex-col gap-4 relative">
      <StarIcon
        size={24}
        className="text-lines absolute top-3 right-3 cursor-pointer"
      />

      {/* 1. Seção do Placar (Layout de 3 Colunas) */}
      <div className="flex justify-between items-center text-center w-full">
        {/* Time da Casa */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <span className="font-bold text-light text-right hidden sm:block truncate">
            {match.home_team.name}
          </span>
          <img
            src={match.home_team_logo}
            alt={match.home_team.name}
            className="size-14"
          />
        </div>

        {/* Placar Central */}
        <div className="flex flex-col gap-4 px-8 mt-2 ">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-light">{homeScore}</span>
            <span className="text-3xl font-bold text-lines">-</span>
            <span className="text-3xl font-bold text-light">{awayScore}</span>
          </div>
          <div className="text-center text-sm font-semibold text-lines -mt-4">
            Finalizado
          </div>
        </div>

        {/* Time Visitante */}
        <div className="flex-1 flex items-center justify-start gap-3">
          <img
            src={match.away_team_logo}
            alt={match.away_team.name}
            className="size-14"
          />
          <span className="font-bold text-light text-left hidden sm:block truncate">
            {match.away_team.name}
          </span>
        </div>
      </div>

      {/* 2. Seção de Informações (Layout de 3 Colunas) */}
      <div className="flex gap-2 justify-center items-center text-xs text-light font-semibold text-center w-full px-1 mt-2 sm:px-4">
        {/* Data */}
        <div className="flex items-center gap-1.5">
          <CalendarBlankIcon size={16} />
          <span className="hidden sm:inline-block">{formattedDate}</span>
           <span className="sm:hidden">{format(new Date(match.date), "dd/MM/yy")}</span>
        </div>

        {/* Competição */}
        <div className="flex items-center gap-1.5 justify-center px-2">
          <img
            src="https://images.fotmob.com/image_resources/logo/leaguelogo/dark/268.png"
            alt="Brasileirão Betano"
            className="size-6"
          />
          <span className="hidden md:block">Brasileirão Betano</span>
        </div>

        {/* Local */}
        <div className="flex items-center gap-1.5">
          <MapTrifoldIcon size={16} />
          <span className="truncate">{match.venue}</span>
        </div>
      </div>
    </div>
  );
}