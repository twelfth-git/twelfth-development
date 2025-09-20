"use client";
import {
  ChatCircleIcon,
  HeartIcon,
  MedalIcon,
  PushPinSimpleIcon,
  RepeatIcon,
  ShareFatIcon,
  DotsThreeOutlineIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";

// Definição da interface para as props, garantindo tipagem segura
interface PostcardProps {
  fixed: boolean;
  userAvatar: string;
  userName: string;
  userHandle: string;
  timePosted: string;
  postText: string;
  postImages: string[];
  initialComments: number;
  initialReposts: number;
  initialLikes: number;
}

export default function Postcard({
  fixed,
  userAvatar,
  userName,
  userHandle,
  timePosted,
  postText,
  postImages,
  initialComments,
  initialReposts,
  initialLikes,
}: PostcardProps) {
  // Funções de formatação e interações movidas para o componente Postcard
  const [reposts, setReposts] = useState(initialReposts);
  const [likes, setLikes] = useState(initialLikes);
  const [repostActive, setRepostActive] = useState(false);
  const [liked, setLiked] = useState(false);

  function fmt(n: number) {
    if (n >= 1000) return `${(n / 1000).toFixed(1)} mil`;
    return String(n);
  }

  function toggleLike() {
    setLiked((s) => {
      setLikes((prev) => (s ? prev - 1 : prev + 1));
      return !s;
    });
  }

  function toggleRepost() {
    setRepostActive((s) => {
      setReposts((prev) => (s ? prev - 1 : prev + 1));
      return !s;
    });
  }

  return (
    <div className="mt-4 gap-4 ml-8 flex">
      <div className="flex flex-col gap-2 bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-4 rounded-lg border border-lines w-132">
        {fixed && (
          <div className="flex gap-2 items-center">
            <PushPinSimpleIcon
              size={16}
              weight="fill"
              className="text-light"
            />
            <p className="text-sm text-light">Fixado</p>
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={userAvatar}
              className="size-10 object-cover rounded-lg"
              alt="avatar user"
            />
            <div className="flex flex-col">
              <p className="text-light font-bold">{userName}</p>
              <p className="text-sm text-lines">@{userHandle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-lines">{timePosted}</p>
            <DotsThreeOutlineIcon
              size={16}
              className="text-lines cursor-pointer"
            />
          </div>
        </div>
        <p className="text-light">{postText}</p>
        <div className="mt-2 flex gap-1">
          {postImages.map((src, index) => (
            <img
              key={index}
              src={src}
              className="w-40 h-46 object-cover rounded-lg"
              alt={`Post image ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <button
            aria-label="Comentários"
            className="flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-lines text-lines bg-transparent hover:border-orange transition-all duration-200 cursor-pointer"
          >
            <ChatCircleIcon
              size={16}
              weight="regular"
              className="text-inherit"
            />
            <span className="text-sm select-none">{fmt(initialComments)}</span>
          </button>

          <button
            aria-label="Repost"
            onClick={toggleRepost}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg border-2 text-sm select-none transition-all duration-200 cursor-pointer
              ${
                repostActive
                  ? "border-orange text-orange bg-[rgba(255,138,0,0.06)] hover:shadow-[0_0_10px_rgba(255,138,0,0.15)]"
                  : "border-lines text-lines hover:border-orange"
              }`}
          >
            <RepeatIcon
              size={16}
              weight="regular"
              className="text-inherit"
            />
            <span>{fmt(reposts)}</span>
          </button>

          <button
            aria-label="Curtir"
            onClick={toggleLike}
            className={`flex items-center gap-2 px-3 py-0.5 rounded-lg border-2 select-none transition-all duration-200 cursor-pointer
              ${
                liked
                  ? "border-orange text-orange bg-[rgba(255,138,0,0.06)] hover:shadow-[0_0_12px_rgba(255,138,0,0.18)]"
                  : "border-lines text-lines hover:border-orange"
              }`}
          >
            <HeartIcon
              size={16}
              weight={liked ? "fill" : "regular"}
              className={`transform transition-transform duration-150 ${
                liked ? "scale-105" : ""
              }`}
            />
            <span>{fmt(likes)}</span>
          </button>

          <button
            aria-label="Compartilhar"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-lines text-lines bg-transparent hover:border-orange transition-all duration-200 cursor-pointer"
          >
            <ShareFatIcon size={16} weight="regular" />
          </button>

          <button
            aria-label="Medalha"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-lines text-lines bg-transparent hover:border-orange transition-all duration-200 cursor-pointer"
          >
            <MedalIcon size={16} weight="regular" />
          </button>
        </div>
      </div>
    </div>
  );
}
