// Salve como, por exemplo, src/app/team/[teamId]/page.tsx ou um componente similar

"use client";

import React, { useState, useEffect } from "react";
import PostCard from "../posts/PostCard"; // Ajuste o caminho se necessário
import LoadingSpinner from "@/components/common/LoadingSpinner"; // Ajuste o caminho se necessário

// --- Interfaces para tipagem dos dados ---
interface Competition {
  id: string;
  logoUrl: string;
}

interface Team {
  id: string;
  name: string;
  logoUrl: string;
  countryFlagUrl: string;
  city: string;
  stadium: {
    name: string;
    capacity: number;
  };
  competitions: Competition[];
}

interface Post {
  id: string | number;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  content: string;
  imageUrl?: string;
  createdAt: string;
  stats: {
    comments: number;
    likes: number;
    repeats: number;
  };
  isLikedByCurrentUser: boolean;
  isRepeatedByCurrentUser: boolean;
  interactedUsers: {
    name: string;
    avatarUrl: string;
  }[];
  taggedPlayers: {
    id: string;
    name: string;
  }[];
}

// --- Funções Mock para buscar dados (simulando uma API) ---

const fetchTeamInfoAPI = async (teamId: string): Promise<Team> => {
  console.log(`Buscando informações para o time: ${teamId}`);
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simula delay da rede

  // Dados mocados para o Botafogo
  return {
    id: "1958",
    name: "Botafogo",
    logoUrl: "https://img.sofascore.com/api/v1/team/1958/image",
    countryFlagUrl: "https://img.sofascore.com/api/v1/country/BR/flag",
    city: "Rio de Janeiro",
    stadium: {
      name: "Estádio Nilton Santos",
      capacity: 44611,
    },
    competitions: [
      {
        id: "325",
        logoUrl:
          "https://img.sofascore.com/api/v1/unique-tournament/325/image/dark",
      },
      {
        id: "373",
        logoUrl:
          "https://img.sofascore.com/api/v1/unique-tournament/373/image/dark",
      },
      {
        id: "384",
        logoUrl:
          "https://img.sofascore.com/api/v1/unique-tournament/384/image/dark",
      },
      {
        id: "357",
        logoUrl:
          "https://img.sofascore.com/api/v1/unique-tournament/357/image/dark",
      },
      {
        id: "490",
        logoUrl:
          "https://img.sofascore.com/api/v1/unique-tournament/490/image/dark",
      },
      {
        id: "92",
        logoUrl:
          "https://img.sofascore.com/api/v1/unique-tournament/92/image/dark",
      },
      {
        id: "14602",
        logoUrl:
          "https://img.sofascore.com/api/v1/unique-tournament/14602/image/dark",
      },
    ],
  };
};

const fetchTeamPostsAPI = async (
  teamId: string,
  tab: string
): Promise<Post[]> => {
  console.log(`Buscando posts para o time ${teamId} na aba: ${tab}`);
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Exemplo de posts para a aba 'Destaques'
  const highlightsPosts: Post[] = [
    {
      id: "post1",
      user: {
        name: "Informa Fogo",
        username: "informafogo",
        avatarUrl:
          "https://pbs.twimg.com/profile_images/1546008584319897600/DGGVNdN0_400x400.jpg",
      },
      content:
        "Em um estudo feito pelo CIES dos 100 clubes que mais movimentaram dinheiro no mercado da bola, Botafogo é o brasileiro mais bem colocado.\n\n O Alvinegro aparece na 30° colocação, tendo movimentado 228,3 milhões de euros (cerca de R$ 1,4 bilhão). \n\n — @geglobo",
      imageUrl:
        "https://pbs.twimg.com/media/G0FTRGoWsAEwNV-?format=jpg&name=900x900",
      createdAt: "2025-09-05T10:00:00Z",
      stats: { comments: 1, likes: 121, repeats: 6 },
      isLikedByCurrentUser: true,
      isRepeatedByCurrentUser: false,
      interactedUsers: [
        {
          name: "Luiz Gustavo",
          avatarUrl:
            "https://i.pinimg.com/474x/5d/09/60/5d0960aad01919829b8feb3bc2db9da0.jpg",
        },
      ],
      taggedPlayers: [{ id: "392", name: "Newton" }],
    },
  ];

  // Simplesmente retorne posts diferentes para abas diferentes
  if (tab === "highlights") return highlightsPosts;
  if (tab === "news") return []; // Nenhum post para a aba 'Novo' por enquanto
  if (tab === "memories") return []; // Nenhum post para a aba 'Memórias'

  return [];
};

// --- Componente da Página ---

type ActiveTab = "highlights" | "news" | "memories";

export default function TeamPageContent() {
  const [teamInfo, setTeamInfo] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("highlights");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito para buscar as informações do time apenas uma vez
  useEffect(() => {
    const loadTeamData = async () => {
      // O '1958' seria o ID do time, vindo da URL por exemplo
      const info = await fetchTeamInfoAPI("1958");
      setTeamInfo(info);
    };
    loadTeamData();
  }, []);

  // Efeito para buscar os posts sempre que a aba ativa mudar
  useEffect(() => {
    if (!teamInfo) return; // Não faz nada se os dados do time ainda não carregaram

    const loadPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await fetchTeamPostsAPI(teamInfo.id, activeTab);
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, [activeTab, teamInfo]); // Roda quando a aba ou a info do time mudam

  // Renderiza um spinner geral enquanto as informações do time carregam
  if (!teamInfo) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      {/* Cabeçalho do Time */}
      <div className="flex gap-4 px-4 py-6">
        <img
          src={teamInfo.logoUrl}
          alt="team-logo"
          className="w-24 h-24 md:w-32 md:h-32 rounded-lg p-2 bg-lines"
        />
        <div className="flex flex-col gap-1 justify-center">
          <p className="font-bold text-xl text-light">{teamInfo.name}</p>
          <div className="flex gap-2 items-center">
            <img src={teamInfo.countryFlagUrl} className="size-5" />
            <p className="font-semibold text-sm text-light">{teamInfo.city}</p>
          </div>
          <p className="font-semibold text-sm text-light">
            {teamInfo.stadium.name} (
            {teamInfo.stadium.capacity.toLocaleString("pt-BR")})
          </p>
          <div className="flex gap-2 items-center mt-1.5">
            {teamInfo.competitions.map((comp) => (
              <img key={comp.id} src={comp.logoUrl} className="size-7" />
            ))}
          </div>
        </div>
      </div>

      {/* Navegação por Abas */}
      <div className="relative flex justify-center gap-8 p-2 border-t border-b border-lines">
        <p
          onClick={() => setActiveTab("highlights")}
          className="relative cursor-pointer text-lg transition-colors"
        >
          <span
            className={
              activeTab === "highlights"
                ? "text-light"
                : "text-lines hover:text-light/80"
            }
          >
            Destaques
          </span>
          {activeTab === "highlights" && (
            <span className="absolute -bottom-2.5 left-0 h-0.5 w-full rounded bg-orange"></span>
          )}
        </p>
        <p
          onClick={() => setActiveTab("news")}
          className="relative cursor-pointer text-lg transition-colors"
        >
          <span
            className={
              activeTab === "news"
                ? "text-light"
                : "text-lines hover:text-light/80"
            }
          >
            Novo
          </span>
          {activeTab === "news" && (
            <span className="absolute -bottom-2.5 left-0 h-0.5 w-full rounded bg-orange"></span>
          )}
        </p>
        <p
          onClick={() => setActiveTab("memories")}
          className="relative cursor-pointer text-lg transition-colors"
        >
          <span
            className={
              activeTab === "memories"
                ? "text-light"
                : "text-lines hover:text-light/80"
            }
          >
            Memórias
          </span>
          {activeTab === "memories" && (
            <span className="absolute -bottom-2.5 left-0 h-0.5 w-full rounded bg-orange"></span>
          )}
        </p>
      </div>

      {/* Conteúdo das Abas */}
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center text-lines p-8">
            Nenhum post encontrado aqui.
          </p>
        )}
      </div>
    </div>
  );
}
