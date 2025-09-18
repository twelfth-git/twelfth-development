"use client";
import {
  CheckFatIcon,
  DotsThreeIcon,
  DotsThreeOutlineIcon,
  EnvelopeIcon,
  PushPinSimpleIcon,
  SealCheckIcon,
  MedalIcon,
  HeartIcon,
  ChatCircleIcon,
  ShareFatIcon,
  RepeatIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";

export default function Page() {
  const [checked, setChecked] = useState(false);

  // interações (números em estado para demonstrar incremento ao curtir)
  const [comments] = useState(744);
  const [reposts, setReposts] = useState(7000);
  const [likes, setLikes] = useState(96000);
  const [repostActive, setRepostActive] = useState(true); // no print repost está em laranja
  const [liked, setLiked] = useState(true); // no print o coração está "ativo"

  function fmt(n: number) {
    if (n >= 1000) return `${Math.round(n / 1000)} mil`;
    return String(n);
  }

  function toggleLike() {
    setLiked((s) => {
      setLikes((prev) => (s ? prev - 1 : prev + 1)); // s = estado anterior (true = já curtido)
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
        {/* Menu */}
        <div className="mt-24 flex gap-2 mb-2">
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
            Believe, <span className="text-orange cursor-pointer">@psg</span> & <span className="text-orange cursor-pointer">@equipedefrance</span>, <span className="text-orange cursor-pointer">@adidas</span>
          </p>
        </div>
        <div className="mt-4 gap-4 ml-8 flex">
          <div className="flex flex-col gap-2 bg-[linear-gradient(180deg,#060606_0%,#151515_100%)] p-4 rounded-lg border border-lines w-132">
            <div className="flex gap-2 items-center">
              <PushPinSimpleIcon
                size={16}
                weight="fill"
                className="text-light"
              />
              <p className="text-sm text-light">Fixado</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <img
                  src="https://i.pinimg.com/736x/66/49/76/664976073f0a065ee7c93920e20e029d.jpg"
                  className="size-10 object-cover rouded-lg"
                  alt="avatar user"
                />
                <div className="flex flex-col">
                  <p className="text-light font-bold">Ousmané Dembélé</p>
                  <p className="text-sm text-lines">@dembele</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-lines">8h</p>
                <DotsThreeOutlineIcon
                  size={16}
                  className="text-lines cursor-pointer"
                />
              </div>
            </div>
            <p className="text-light">
              Nous n’avons pas pu obtenir la victoire que nous voulions mais ça
              ne fait que commencer. Heureux de réaliser mes débuts sous ces
              nouvelles couleurs et avec l’envie de tout donner lors du prochain
              match.
            </p>
            <div className="mt-2 flex gap-1">
              <img
                src="https://pbs.twimg.com/media/F3-xTXMWcAAa0v1?format=jpg&name=large"
                className="w-40 h-46 object-cover rounded-l-lg"
                alt="image1"
              />
              <img
                src="https://pbs.twimg.com/media/F3-xTYdWMAAxd4o?format=jpg&name=large"
                className="w-40 h-46 object-cover rounded-r-lg"
                alt="image1"
              />
            </div>

            {/* ===== Barra de interações (ESTILIZADA em "pills") ===== */}
            <div className="mt-3 flex items-center gap-3 px-2">
              {/* Comentários (outline claro) */}
              <button
                aria-label="Comentários"
                className="flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-lines text-lines bg-transparent hover:border-orange transition-all duration-200 cursor-pointer"
              >
                <ChatCircleIcon
                  size={16}
                  weight="regular"
                  className="text-inherit"
                />
                <span className="text-sm select-none">{fmt(comments)}</span>
              </button>

              {/* Repost (ativo: laranja) */}
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

              {/* Like (ativo: laranja, clicável) */}
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

              {/* Compartilhar (só ícone no print) */}
              <button
                aria-label="Compartilhar"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-lines text-lines bg-transparent hover:border-orange transition-all duration-200 cursor-pointer"
              >
                <ShareFatIcon size={16} weight="regular" />
              </button>

              {/* Medalha (só ícone) */}
              <button
                aria-label="Medalha"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-lines text-lines bg-transparent hover:border-orange transition-all duration-200 cursor-pointer"
              >
                <MedalIcon size={16} weight="regular" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
