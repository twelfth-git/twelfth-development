"use client";

import React, { useState, useEffect } from 'react';
import PostCard from '../posts/PostCard'; 
import LoadingSpinner from '@/components/common/LoadingSpinner'; 


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


const fetchPostsFromAPI = async (tab: 'forYou' | 'following'): Promise<Post[]> => {
  console.log(`Buscando posts para a aba: ${tab}`);

  await new Promise(resolve => setTimeout(resolve, 700)); 

  const forYouPosts: Post[] = [
    {
      id: 'post1',
      user: { name: "R10 Score", username: "R10Score", avatarUrl: "https://pbs.twimg.com/profile_images/1879913107838943232/kj-jucyb_400x400.jpg" },
      content: "Que partida do Newton pelo Botafogo! Foi o LÍDER em desarmes (3) e interceptações (4), além de marcar um gol. Decisivo! 🔥",
      imageUrl: "https://pbs.twimg.com/media/Gzoxis6X0AEkIJ3?format=jpg&name=medium",
      createdAt: "2025-09-04T10:00:00Z",
      stats: { comments: 124, likes: 1700, repeats: 382 },
      isLikedByCurrentUser: false,
      isRepeatedByCurrentUser: true,
      interactedUsers: [{ name: 'Romário', avatarUrl: 'https://i.pinimg.com/736x/1c/3e/b1/1c3eb16cc263542faf84f111a5101f17.jpg' }],
      taggedPlayers: [{ id: "392", name: "Newton" }],
    },
    {
      id: 'post3',
      user: { name: "Ancelotti", username: "MrAncelotti", avatarUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSqrdG5TIMtvw31FElZm2oWAdwvlZdmY_T8F5wUUmUk1ZZpwKrY9to0ZBYgNNBdQ34xTfB9z1oTo51aBwzMaSK1gGIaolC7VhHwLXAYWQ" },
      content: "Uma grande final se decide nos detalhes. Orgulhoso do trabalho de Vinicius Jr e Rodrygo.",
      createdAt: "2025-09-03T18:00:00Z",
      stats: { comments: 2300, likes: 98000, repeats: 12000 },
      isLikedByCurrentUser: true,
      isRepeatedByCurrentUser: true,
      interactedUsers: [
        { name: 'Vini Jr.', avatarUrl: 'https://pbs.twimg.com/media/GvqVSnzXoAASqtp?format=jpg&name=4096x4096'},
        { name: 'Rodrygo', avatarUrl: 'https://pbs.twimg.com/profile_images/1956404022694346753/g6yNpVf2_400x400.jpg'},
      ],
      taggedPlayers: [
        { id: "942421", name: "Vinicius Jr" },
        { id: "987332", name: "Rodrygo" },
      ],
    }
  ];

  const followingPosts: Post[] = [
    {
      id: 'post2',
      user: { name: "Fabrizio Romano", username: "FabrizioRomano", avatarUrl: "https://pbs.twimg.com/profile_images/1741753635158024192/j0m8Ucvv_400x400.jpg" },
      content: "HERE WE GO! Kylian Mbappé to Real Madrid is a done deal. Contract signed, announcement soon. ⚪️🔵",
      createdAt: "2025-09-04T12:30:00Z",
      stats: { comments: 890, likes: 25000, repeats: 4200 },
      isLikedByCurrentUser: true,
      isRepeatedByCurrentUser: false,
      interactedUsers: [{ name: 'Ancelotti', avatarUrl: 'https://i.pinimg.com/736x/2f/d7/26/2fd726e44073759f79b7cbf2f9cf42dd.jpg' }],
      taggedPlayers: [{ id: "852964", name: "Kylian Mbappé" }],
    },
    {
      id: 'post4',
      user: { name: "GE Flamengo", username: "ge_flamengo", avatarUrl: "https://pbs.twimg.com/profile_images/1364750086626893831/wQkHcaRk_400x400.jpg" },
      content: "Com dois gols de Pedro, Flamengo vence o clássico no Maracanã e assume a liderança do campeonato.",
      imageUrl: "https://s2-ge.glbimg.com/suj_YBasQNMQZmxw3cFTQ6SyPao=/0x0:1920x1280/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2025/C/a/Q0vKQkR9iC9SIQjnXppQ/thumbnail-dur-3338.jpg",
      createdAt: "2025-09-02T23:00:00Z",
      stats: { comments: 540, likes: 12000, repeats: 980 },
      isLikedByCurrentUser: false,
      isRepeatedByCurrentUser: false,
      interactedUsers: [],
      taggedPlayers: [{ id: "423", name: "Pedro" }],
    }
  ];
  
  if (tab === 'forYou') return forYouPosts;
  if (tab === 'following') return followingPosts;
  return [];
};


export default function MainContent() {
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const fetchedPosts = await fetchPostsFromAPI(activeTab);
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, [activeTab]);

  return (
    <div className="w-full">
      <div className="relative flex justify-center gap-8 p-2 border-b border-lines">
        <p onClick={() => setActiveTab('forYou')} className="relative cursor-pointer text-lg md:text-xl transition-colors">
          <span className={activeTab === 'forYou' ? 'text-light' : 'text-lines hover:text-light/80'}>
            Para você
          </span>
          {activeTab === 'forYou' && (
            <span className="absolute -bottom-2.5 left-0 h-0.5 w-full rounded bg-orange"></span>
          )}
        </p>
        <p onClick={() => setActiveTab('following')} className="relative cursor-pointer text-lg md:text-xl transition-colors">
          <span className={activeTab === 'following' ? 'text-light' : 'text-lines hover:text-light/80'}>
            Seguindo
          </span>
          {activeTab === 'following' && (
            <span className="absolute -bottom-2.5 left-0 h-0.5 w-full rounded bg-orange"></span>
          )}
        </p>
      </div>

      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-center text-lines p-8">Nenhum post encontrado aqui.</p>
        )}
      </div>
    </div>
  );
}