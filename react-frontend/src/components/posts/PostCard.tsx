"use client";

import { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import {
  ChatCircleIcon,
  DotsThreeIcon,
  HeartIcon,
  MedalIcon,
  RepeatIcon,
  ShareFatIcon,
} from "@phosphor-icons/react";


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

interface PostCardProps {
  post: Post;
}


const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "a";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "min";
    return Math.floor(seconds) + "s";
};

const formatCount = (num: number) => num >= 1000 ? `${(num / 1000).toFixed(1)}k`.replace('.0', '') : num;


export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser);
  const [isRepeated, setIsRepeated] = useState(post.isRepeatedByCurrentUser);

  const handleLikeClick = () => setIsLiked(!isLiked);
  const handleRepeatClick = () => setIsRepeated(!isRepeated);

  const highlightedContent = useMemo(() => {
    let content = post.content;
    if (!post.taggedPlayers || post.taggedPlayers.length === 0) {
      return content;
    }
    
    post.taggedPlayers.forEach(player => {
      const regex = new RegExp(`\\b(${player.name})\\b`, 'gi');
      content = content.replace(regex, `<span data-player-id="${player.id}" class="text-orange hover:underline font-semibold cursor-pointer">$1</span>`);
    });
    return content;
  }, [post.content, post.taggedPlayers]);

  const handleContentClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'SPAN' && target.dataset.playerId) {
      e.stopPropagation();
      router.push(`/home?playerId=${target.dataset.playerId}`);
    }
  };

  return (
    <div>
      <div className="flex flex-col px-6 py-4 gap-4 cursor-pointer hover:bg-white/5 transition-colors duration-200 border-b border-lines">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2">
            <img className="size-10 rounded-lg object-cover" src={post.user.avatarUrl} alt={`${post.user.name} avatar`}/>
            <div>
              <p className="text-light font-bold">{post.user.name}</p>
              <p className="text-light text-xs">@{post.user.username}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <p className="text-light text-sm">{formatTimeAgo(post.createdAt)}</p>
            <DotsThreeIcon className="text-light" size={20} />
          </div>
        </div>
        
        <p
          className="text-light font-medium whitespace-pre-wrap"
          onClick={handleContentClick}
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        />
        
        {post.imageUrl && (
            <img src={post.imageUrl} className="max-w-72 rounded-lg" alt="Mídia do post"/>
        )}
        
        {post.interactedUsers.length > 0 && (
          <div className="flex items-center">
            <div className="relative flex items-center">
              {post.interactedUsers.slice(0, 3).map((user, index) => (
                  <img
                    key={index}
                    src={user.avatarUrl}
                    alt={user.name}
                    className={`size-5 rounded-sm object-cover ${index > 0 ? '-ml-1' : ''}`}
                    style={{ zIndex: 3 - index }}
                  />
              ))}
            </div>
            <p className="text-light text-sm ml-2 cursor-pointer">
              Curtido por <span className="font-bold">{post.interactedUsers[0].name}</span> e{" "}
              <span className="font-bold">outras pessoas</span>
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex gap-1 px-2 items-center border border-light/50 rounded-lg cursor-pointer transition-colors duration-200 group">
            <ChatCircleIcon className="text-light group-hover:text-white" size={16} />
            <p className="text-sm text-light group-hover:text-white">{post.stats.comments}</p>
          </div>

          <div
            className={`flex gap-1 px-2 items-center rounded-lg border border-light/50 cursor-pointer transition-colors duration-200 group ${isLiked ? "border-orange" : "border-light/50"}`}
            onClick={handleLikeClick}
          >
            <HeartIcon className={`${isLiked ? "text-orange" : "text-light group-hover:text-white"}`} size={16} weight={isLiked ? "fill" : "regular"} />
            <p className={`text-sm ${isLiked ? "text-orange" : "text-light group-hover:text-white"}`}>
              {formatCount(isLiked ? post.stats.likes + 1 : post.stats.likes)}
            </p>
          </div>

          <div
            className={`flex gap-1 px-2 items-center rounded-lg border border-light/50 cursor-pointer transition-colors duration-200 group ${isRepeated ? "border-orange" : "border-light/50"}`}
            onClick={handleRepeatClick}
          >
            <RepeatIcon className={`${isRepeated ? "text-orange" : "text-light group-hover:text-white"}`} size={16} weight={isRepeated ? "fill" : "regular"}/>
            <p className={`text-sm ${isRepeated ? "text-orange" : "text-light group-hover:text-white"}`}>
              {formatCount(post.stats.repeats)}
            </p>
          </div>
          
          <div className="flex gap-1 px-2 items-center border border-light/50 rounded-lg cursor-pointer transition-colors duration-200 group">
            <MedalIcon className="text-light group-hover:text-white" size={16} />
          </div>

          <div className="flex gap-1 px-2 items-center border border-light/50 rounded-lg cursor-pointer transition-colors duration-200 group">
            <ShareFatIcon className="text-light group-hover:text-white" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}