"use client";

import AppLayout from "@/components/layout/AppLayout";
import Postcard from "@/components/posts/PostCard";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Hook para ler parâmetros da URL

// Componentes da página
import MatchScorecard from "@/components/match/MatchScorecard";
import MatchTabs from "@/components/match/MatchTabs";
import NewMatchPost from "@/components/match/NewMatchPost";

// Importando a definição de tipo do arquivo dedicado
import { Match } from "@/types/match";

export default function MatchPage() {
  const params = useParams();
  const matchId = params.id as string; 

  // Estados para gerenciar os dados, carregamento e erros
  const [matchData, setMatchData] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efeito que busca os dados da API quando o componente carrega ou o ID muda
  useEffect(() => {
    if (!matchId) return; // Não faz nada se o ID não estiver disponível ainda

    const fetchMatchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Chamada para a sua API Go local
        const response = await fetch(`http://localhost:8080/api/v1/match/${matchId}`);
        
        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - Partida não encontrada ou falha no servidor.`);
        }
        
        const data: Match = await response.json();
        setMatchData(data); // Salva os dados no estado

      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
      } finally {
        setLoading(false); // Termina o carregamento, independentemente do resultado
      }
    };

    fetchMatchData();
  }, [matchId]); // O array de dependências garante que isso só roda quando 'matchId' muda

  const postDeExemplo = {
    userAvatar: "https://pbs.twimg.com/profile_images/1851973070111522816/ERbDiftN_400x400.jpg",
    userName: "Central do Braga",
    userHandle: "CentralDoBrega",
    timePosted: "8h",
    postText: "O maior medo do Atlético é ver o Botafogo jogando com um jogador a menos.",
    initialComments: 88,
    initialReposts: 607,
    initialLikes: 11000,
  };

  // --- Renderização Condicional ---

  // Estado de Carregamento
  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64 text-light">Carregando dados da partida...</div>
      </AppLayout>
    );
  }

  // Estado de Erro
  if (error) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64 text-red-500">{error}</div>
      </AppLayout>
    );
  }

  // Estado de Sucesso (mas sem dados)
  if (!matchData) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64 text-light">Nenhuma partida encontrada.</div>
      </AppLayout>
    );
  }

  // Estado de Sucesso (com dados)
  return (
    <AppLayout>
      <div className="flex flex-col items-center w-full px-4 py-2">
        <div className="w-full max-w-2xl flex flex-col gap-4 items-center">
          
          {/* 1. Placar da Partida - Agora recebe os dados via props */}
          <MatchScorecard match={matchData} />

          {/* 2. Abas de Navegação */}
          <MatchTabs />

          {/* 3. Informação de Check-in (conteúdo estático por enquanto) */}
          <div className="w-fit flex items-center justify-center gap-2 bg-[linear-gradient(90deg,#060606_0%,#151515_100%)] rounded-lg border border-lines p-2">
            <div className="flex -space-x-2 ">
              <img src="https://i.pravatar.cc/30?u=a" className="size-8 rounded-lg border-2 border-background" alt="avatar" />
              <img src="https://i.pravatar.cc/30?u=b" className="size-8 rounded-lg border-2 border-background" alt="avatar" />
              <img src="https://i.pravatar.cc/30?u=c" className="size-8 rounded-lg border-2 border-background" alt="avatar" />
            </div>
            <p className="text-sm text-light">e mais 87 pessoas fizeram check-in nesse jogo</p>
          </div>

          {/* 4. Caixa de Novo Post */}
          <NewMatchPost />

          {/* 5. Feed de Posts */}
          <Postcard {...postDeExemplo} />
        </div>
      </div>
    </AppLayout>
  );
}

