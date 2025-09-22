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
import React, { useState, useRef, useEffect } from "react";

interface PostcardProps {
  fixed?: boolean;
  userAvatar?: string;
  userName?: string;
  userHandle?: string;
  timePosted?: string;
  postText?: string;
  postImages?: string[];
  initialComments?: number;
  initialReposts?: number;
  initialLikes?: number;
  content?: string;
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
  content,
}: PostcardProps) {
  const [reposts, setReposts] = useState(initialReposts || 0);
  const [likes, setLikes] = useState(initialLikes || 0);
  const [repostActive, setRepostActive] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showRepostMenu, setShowRepostMenu] = useState(false);

  const repostMenuRef = useRef<HTMLDivElement | null>(null);

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

  function handleRepostClick() {
    setShowRepostMenu((prev) => !prev);
  }

  function handleRepost(type: "simples" | "com-comentario") {
    if (type === "simples") {
      setRepostActive(true);
      setReposts((prev) => prev + 1);
    }
    if (type === "com-comentario") {
      alert("Abrir modal para repostar com comentário 🚀");
    }
    setShowRepostMenu(false);
  }

  // Fecha menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        repostMenuRef.current &&
        !repostMenuRef.current.contains(event.target as Node)
      ) {
        setShowRepostMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-4 gap-4 ml-8 flex">
      <div className="flex flex-col gap-2 bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-4 rounded-lg border border-lines w-132 relative">
        {fixed && (
          <div className="flex gap-2 items-center">
            <PushPinSimpleIcon size={16} weight="fill" className="text-light" />
            <p className="text-sm text-light">Fixado</p>
          </div>
        )}

        {(userAvatar || userName) && (
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {userAvatar && (
                <img
                  src={userAvatar}
                  className="size-10 object-cover rounded-lg cursor-pointer"
                  alt="avatar user"
                />
              )}
              <div className="flex flex-col">
                {userName && <p className="text-light font-bold cursor-pointer">{userName}</p>}
                {userHandle && (
                  <p className="text-sm text-lines cursor-pointer">@{userHandle}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {timePosted && (
                <p className="text-sm text-lines">{timePosted}</p>
              )}
              <DotsThreeOutlineIcon
                size={16}
                className="text-lines cursor-pointer"
              />
            </div>
          </div>
        )}

        <p className="text-light">{postText || content}</p>

        {postImages && postImages.length > 0 && (
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
        )}

        {(initialComments !== undefined ||
          initialReposts !== undefined ||
          initialLikes !== undefined) && (
          <div className="mt-3 flex items-center gap-3 relative">
            {/* Comentários */}
            {initialComments !== undefined && (
              <button
                aria-label="Comentários"
                className="flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-lines text-lines hover:border-orange transition-all duration-200"
              >
                <ChatCircleIcon size={16} weight="regular" />
                <span className="text-sm select-none">{fmt(initialComments)}</span>
              </button>
            )}

            {/* Repost */}
            {initialReposts !== undefined && (
              <div className="relative" ref={repostMenuRef}>
                <button
                  aria-label="Repost"
                  onClick={handleRepostClick}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg border-2 text-sm transition-all duration-200 cursor-pointer
                  ${
                    repostActive
                      ? "border-orange text-orange bg-[rgba(255,138,0,0.06)]"
                      : "border-lines text-lines hover:border-orange"
                  }`}
                >
                  <RepeatIcon size={16} weight="regular" />
                  <span>{fmt(reposts)}</span>
                </button>

                {showRepostMenu && (
                  <div className="absolute top-10 left-0 w-32 bg-[#1a1a1a] border border-lines rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => handleRepost("simples")}
                      className="w-full text-left px-4 py-2 hover:bg-[#2a2a2a] text-light flex items-center gap-2 cursor-pointer"
                    >
                      <RepeatIcon/>
                      Repostar
                    </button>
                    <button
                      onClick={() => handleRepost("com-comentario")}
                      className="w-full text-left px-4 py-2 hover:bg-[#2a2a2a] text-light flex items-center gap-2 cursor-pointer"
                    >
                      <ChatCircleIcon/>
                       Comentar
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Likes */}
            {initialLikes !== undefined && (
              <button
                aria-label="Curtir"
                onClick={toggleLike}
                className={`flex items-center gap-2 px-3 py-0.5 rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${
                  liked
                    ? "border-orange text-orange bg-[rgba(255,138,0,0.06)]"
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
            )}

            {/* Share */}
            <button
              aria-label="Compartilhar"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-lines text-lines hover:border-orange transition-all duration-200"
            >
              <ShareFatIcon size={16} weight="regular" />
            </button>

            {/* Medalha */}
            <button
              aria-label="Medalha"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-lines text-lines hover:border-orange transition-all duration-200"
            >
              <MedalIcon size={16} weight="regular" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
