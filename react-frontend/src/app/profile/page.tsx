"use client";
import HighlightCard from "@/components/profile/HighlightCard";
import Postcard from "@/components/posts/PostCard";
import GlassMenu from "@/components/common/GlassMenu"; // 👈 importa o menu aqui
import {
  CheckFatIcon,
  DotsThreeIcon,
  EnvelopeIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";

export default function Page() {
  const [checked, setChecked] = useState(false);

  const postcardData = {
    fixed: true,
    userAvatar:
      "https://i.pinimg.com/736x/66/49/76/664976073f0a065ee7c93920e20e029d.jpg",
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
  };

  return (
    <div className="max-w-[1320px] mx-auto flex min-h-screen mt-4 justify-center">
      <div className="flex flex-col items-center">
        <div className="relative flex justify-start">
          {/* Imagem de capa */}
          <img
            src="https://i.pinimg.com/736x/d6/0c/93/d60c9340728598bc242af282fcd0ab41.jpg"
            alt="user header"
            className="object-cover w-147 h-40 rounded-lg"
          />

          <div className="absolute -bottom-18 left-4 right-4 flex justify-between items-start">
            {/* Avatar + Texto */}
            <div className="flex items-start gap-3">
              <img
                src="https://i.pinimg.com/736x/66/49/76/664976073f0a065ee7c93920e20e029d.jpg"
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

            {/* Ícones + Entrou em */}
            <div className="flex flex-col items-end gap-2 mt-14">
              <div className="flex gap-2">
                {/* Botão 1 */}
                <button
                  className="relative bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-2 rounded-lg cursor-pointer border border-lines 
                  hover:shadow-[0_0_20px_rgba(255,138,0,0.5)] transition-shadow duration-500"
                >
                  <DotsThreeIcon
                    size={20}
                    className="text-light relative z-10"
                  />
                </button>

                {/* Botão 2 */}
                <button
                  className="relative bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-2 rounded-lg cursor-pointer border border-lines 
                  hover:shadow-[0_0_20px_rgba(255,138,0,0.5)] transition-shadow duration-500"
                >
                  <EnvelopeIcon
                    size={20}
                    className="text-light relative z-10"
                  />
                </button>

                {/* Botão 3 (Check com brilho animado + preenchimento ao clicar) */}
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

        {/* Menu */}
        <div className="mt-24 flex gap-2 mb-2 ml-6">
          {["Principal", "Posts", "Memórias", "Mídia"].map((item, idx) => (
            <button
              key={idx}
              className={`min-w-[100px] px-4 py-1 rounded-lg border transition-all duration-500
          ${
            item === "Principal"
              ? "border-orange text-orange"
              : "border-light text-light"
          }
          hover:shadow-[0_0_12px_rgba(255,138,0,0.6)] cursor-pointer`}
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
            Believe, <span className="text-orange cursor-pointer">@psg</span> &{" "}
            <span className="text-orange cursor-pointer">@equipedefrance</span>,{" "}
            <span className="text-orange cursor-pointer">@adidas</span>
          </p>
        </div>

        {/* Post */}
        <Postcard
          {...postcardData}
          initialComments={postcardData.initialComments}
          initialReposts={postcardData.initialReposts}
          initialLikes={postcardData.initialLikes}
        />

        <HighlightCard />
      </div>

      {/* 👇 Menu de vidro fixo no final */}
      <GlassMenu />
    </div>
  );
}
