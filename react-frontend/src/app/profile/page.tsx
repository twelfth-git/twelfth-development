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
import Sidebar from "@/components/common/Sidebar";

interface PostType {
  id: number;
  type: "post" | "memory" | "media";
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
  component?: "highlight"; // para identificar casos especiais
}

export default function Page() {
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("Principal");

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
      component: "highlight",
    },
    {
      id: 4,
      type: "memory",
      content: "Uma memória legal",
    },
    {
      id: 5,
      type: "media",
      content: "Uma foto ou vídeo",
    },
  ];

  // 👉 Filtra posts de acordo com a aba
  const filteredPosts = allPosts.filter((item) => {
    if (activeTab === "Principal") return true;
    if (activeTab === "Posts") return item.type === "post";
    if (activeTab === "Memórias") return item.type === "memory";
    if (activeTab === "Mídia") return item.type === "media";
    return true;
  });

  const fixedPost =
    (activeTab === "Principal" || activeTab === "Posts") &&
    filteredPosts.find((post) => post.fixed);

  const fixedMemory =
    (activeTab === "Principal" || activeTab === "Memórias") &&
    filteredPosts.find((post) => post.component === "highlight");

  const otherPosts = filteredPosts.filter(
    (post) => !post.fixed && post.component !== "highlight"
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar/>

      {/* Conteúdo central */}
      <main className="flex-1 max-w-[1320px] mx-auto mt-4">
        <div className="flex flex-col items-center">
          {/* Banner + perfil */}
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

          {/* Conteúdo filtrado */}
          <div className="w-full flex flex-col items-center">
            {/* Aba Principal */}
            {activeTab === "Principal" && (
              <>
                {fixedPost && <Postcard key={fixedPost.id} {...fixedPost} fixed={fixedPost.fixed} />}
                {fixedMemory && <HighlightCard key={fixedMemory.id} fixed />}
                {otherPosts.map((post) =>
                  post.component === "highlight" ? null : (
                    <Postcard key={post.id} {...post} fixed={post.fixed} />
                  )
                )}
              </>
            )}

            {/* Aba Memórias */}
            {activeTab === "Memórias" &&
              filteredPosts.map((post) =>
                post.component === "highlight" ? (
                  <HighlightCard key={post.id} fixed />
                ) : (
                  <Postcard key={post.id} {...post} fixed={post.fixed} />
                )
              )}

            {/* Outras abas */}
            {activeTab !== "Principal" && activeTab !== "Memórias" &&
              filteredPosts.map((post) =>
                post.component === "highlight" ? null : (
                  <Postcard key={post.id} {...post} fixed={post.fixed} />
                )
              )}
          </div>
        </div>

        <GlassMenu />
      </main>
    </div>
  );
}
