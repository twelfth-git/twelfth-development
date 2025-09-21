"use client";
import HighlightCard from "@/components/profile/HighlightCard";
import Postcard from "@/components/posts/PostCard";
import GlassMenu from "@/components/common/GlassMenu";
import {
  CheckFatIcon,
  DotsThreeIcon,
  EnvelopeIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";

interface PostType {
  id: number;
  type: "post" | "memory" | "media";
  fixed?: boolean; // opcional, vamos garantir default na hora de renderizar
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

export default function Page() {
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("Principal");

  // 👉 Posts de exemplo
  const allPosts: PostType[] = [
    {
      id: 1,
      type: "post",
      fixed: true,
      userAvatar:
        "https://i.pinimg.com/736x/cc/f1/16/ccf116d9381fac1c2c3f81c7fe72b9c5.jpg",
      userName: "Ousmané Dembélé",
      userHandle: "dembele",
      timePosted: "8h",
      postText:
        "Nous n’avons pas pu obtenir la victoire que nous voulions mais ça ne fait que commencer. Heureux de réaliser mes débuts sous ces nouvelles couleurs et avec l’envie de tout donner lors du prochain match.",
      postImages: [
        "https://pbs.twimg.com/media/F3-xTXMWcAAa0v1?format=jpg&name=large",
        "https://pbs.twimg.com/media/F3-xTYdWMAAxd4o?format=jpg&name=large",
      ],
      initialComments: 744,
      initialReposts: 7000,
      initialLikes: 96000,
    },
    {
      id: 2,
      type: "post",
      content: "Outro post qualquer",
    },
    {
      id: 3,
      type: "memory",
      content: "Uma memória legal",
    },
    {
      id: 4,
      type: "media",
      content: "Uma foto ou vídeo",
    },
  ];

  // 👉 Regra de filtragem
  const filteredPosts = allPosts.filter((item) => {
    if (activeTab === "Principal") return true; // mostra tudo
    if (activeTab === "Posts") return item.type === "post";
    if (activeTab === "Memórias") return item.type === "memory";
    if (activeTab === "Mídia") return item.type === "media";
    return true;
  });

  const fixedPost = filteredPosts.find((post) => post.fixed);
  const otherPosts = filteredPosts.filter((post) => !post.fixed);

  return (
    <div className="flex min-h-screen">
      {/* 👉 Sidebar fixa na esquerda */}
      <aside className="fixed left-48 top-0 h-full w-[70px] flex flex-col justify-between items-center py-6">
        <img
          src="/logo.png"
          alt="logo"
          className="size-11 object-cover cursor-pointer"
        />

        <img
          src="https://i.pinimg.com/736x/a0/e3/9b/a0e39bc4ee357ab22bdb92ea6c7d127e.jpg"
          alt="user avatar"
          className="size-12 rounded-lg object-cover cursor-pointer"
        />
      </aside>

      {/* 👉 Conteúdo central */}
      <main className="flex-1 max-w-[1320px] mx-auto mt-4">
        <div className="flex flex-col items-center">
          <div className="relative flex justify-start">
            <img
              src="https://i.pinimg.com/736x/d6/0c/93/d60c9340728598bc242af282fcd0ab41.jpg"
              alt="user header"
              className="object-cover w-147 h-40 rounded-lg"
            />

            <div className="absolute -bottom-18 left-4 right-4 flex justify-between items-start">
              <div className="flex items-start gap-3">
                <img
                  src="https://i.pinimg.com/736x/cc/f1/16/ccf116d9381fac1c2c3f81c7fe72b9c5.jpg"
                  alt="user avatar"
                  className="object-cover size-28 rounded-lg border-2 border-background"
                />
                <div className="flex flex-col relative top-14">
                  <div className="text-light flex items-center gap-2">
                    <h1 className="font-bold">Osmane Dembélé</h1>
                    <SealCheckIcon size={20} className="text-orange" />
                  </div>
                  <p className="text-lines text-sm">@dembele</p>
                  <p className="text-lines text-sm mt-1">
                    <span className="text-light cursor-pointer hover:underline">
                      165{" "}
                    </span>
                    seguindo ·{" "}
                    <span className="text-light cursor-pointer hover:underline">
                      1.9MI{" "}
                    </span>{" "}
                    seguidores
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 mt-14">
                <div className="flex gap-2">
                  <button className="relative bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-2 rounded-lg cursor-pointer border border-lines 
                    hover:shadow-[0_0_20px_rgba(255,138,0,0.5)] transition-shadow duration-500">
                    <DotsThreeIcon size={20} className="text-light relative z-10" />
                  </button>

                  <button className="relative bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-2 rounded-lg cursor-pointer border border-lines 
                    hover:shadow-[0_0_20px_rgba(255,138,0,0.5)] transition-shadow duration-500">
                    <EnvelopeIcon size={20} className="text-light relative z-10" />
                  </button>

                  <button
                    onClick={() => setChecked(!checked)}
                    className="relative group bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-2 rounded-lg cursor-pointer border border-lines overflow-hidden 
                    hover:shadow-[0_0_20px_rgba(255,138,0,0.5)] transition-all duration-500"
                  >
                    <CheckFatIcon
                      size={22}
                      weight={checked ? "fill" : "regular"}
                      className={`relative z-10 transition-all duration-500 transform ${
                        checked ? "text-orange scale-110" : "text-light scale-100"
                      }`}
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full 
                      group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    ></span>
                  </button>
                </div>
                <p className="text-lines text-sm">
                  Entrou em Outubro <span className="text-light"> 2026</span>
                </p>
              </div>
            </div>
          </div>

          {/* Menu de abas */}
          <div className="mt-24 flex gap-2 mb-2 ml-8">
            {["Principal", "Posts", "Memórias", "Mídia"].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(item)}
                className={`min-w-[100px] px-4 py-1 rounded-lg border transition-all duration-500 ${
                  activeTab === item
                    ? "border-orange text-orange"
                    : "border-light text-light"
                } hover:shadow-[0_0_12px_rgba(255,138,0,0.6)] cursor-pointer`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Time favorito */}
          <div className="mt-4 ml-8 gap-4 flex">
            <img
              src="https://img.sofascore.com/api/v1/team/1644/image"
              alt="favorite-team"
              className="size-20 object-cover bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-2 rounded-lg border border-lines"
            />
            <p className="text-sm text-light bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-2 rounded-lg border border-lines w-108">
              Believe, <span className="text-orange">@psg</span> &{" "}
              <span className="text-orange">@equipedefrance</span>,{" "}
              <span className="text-orange">@adidas</span>
            </p>
          </div>

           {/* Conteúdo filtrado */}
          <div className=" w-full flex flex-col items-center">
            {/* Renderiza o post fixado primeiro, se existir */}
            {fixedPost && (
              <Postcard
                key={fixedPost.id}
                {...fixedPost}
                fixed={true} // Força o 'fixed' para true para garantir que o ícone apareça
              />
            )}

            {/* Renderiza o HighlightCard em seguida */}
            <HighlightCard />

            {/* Renderiza o restante dos posts */}
            {otherPosts.map((post) => (
              <Postcard
                key={post.id}
                {...post}
                fixed={post.fixed ?? false}
              />
            ))}
          </div>
        </div>

        <GlassMenu />
      </main>
    </div>
  );
}
