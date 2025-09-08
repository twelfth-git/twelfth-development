"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaretLeftIcon, CaretRightIcon, InfoIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";


// --- Tipos para os componentes ---
type Player = {
  id: number;
  name: string;
  imageUrl: string;
  position: { top: string; left: string }; // Posições em porcentagem
};

type SoccerFieldProps = {
  players: Player[];
  fieldImageUrl: string;
};

// --- Componentes Helper ---

// Componente para renderizar o avatar de cada jogador
const PlayerAvatar: React.FC<{ player: Player }> = ({ player }) => (
  <div
    className="absolute"
    style={{ top: player.position.top, left: player.position.left }}
  >
    {/* Div para centralizar o avatar na coordenada exata */}
    <div className="relative -translate-x-1/2 -translate-y-1/2">
      <img
        src={player.imageUrl}
        alt={player.name}
        className="size-9 rounded-full object-cover bg-pdark cursor-pointer"
      />
    </div>
  </div>
);

// Componente principal do campo
const SoccerField: React.FC<SoccerFieldProps> = ({ players, fieldImageUrl }) => {
  return (
    <div className="relative w-full aspect-[1.5/1] rounded-lg overflow-hidden">
      {/* Imagem de fundo do campo */}
      <img
        src={fieldImageUrl}
        alt="Campo de futebol"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Mapeia e renderiza cada jogador no campo */}
      {players.map((player) => (
        <PlayerAvatar key={player.id} player={player} />
      ))}
    </div>
  );
};

// --- Dados dos Jogadores para a Formação 4-2-3-1 (Layout Horizontal) ---
const players4231: Player[] = [
  // Goleiro (Esquerda)
  { id: 1, name: "Goleiro", imageUrl: "https://img.sofascore.com/api/v1/player/84844/image", position: { top: "50%", left: "14%" } },
  // Defensores
  { id: 4, name: "Lateral", imageUrl: "https://img.sofascore.com/api/v1/player/143593/image", position: { top: "18%", left: "28%" } },
  { id: 2, name: "Zagueiro", imageUrl: "https://img.sofascore.com/api/v1/player/1186587/image", position: { top: "38%", left: "28%" } },
  { id: 3, name: "Zagueiro", imageUrl: "https://img.sofascore.com/api/v1/player/990193/image", position: { top: "60%", left: "28%" } },
  { id: 5, name: "Lateral", imageUrl: "https://img.sofascore.com/api/v1/player/914477/image", position: { top: "80%", left: "28%" } },
  // Meio-Campo (Volantes)
  { id: 6, name: "Meio-Campo", imageUrl: "https://img.sofascore.com/api/v1/player/1463909/image", position: { top: "38%", left: "43%" } },
  { id: 7, name: "Meio-Campo", imageUrl: "https://img.sofascore.com/api/v1/player/1064039/image", position: { top: "62%", left: "43%" } },
  // Meio-Campo (Atacantes)
  { id: 8, name: "Ponta", imageUrl: "https://img.sofascore.com/api/v1/player/1016948/image", position: { top: "22%", left: "62%" } },
  { id: 10, name: "Meia Atacante", imageUrl: "https://img.sofascore.com/api/v1/player/874739/image", position: { top: "50%", left: "62%" } },
  { id: 9, name: "Ponta", imageUrl: "https://img.sofascore.com/api/v1/player/975216/image", position: { top: "78%", left: "62%" } },
  // Atacante (Direita)
  { id: 11, name: "Atacante", imageUrl: "https://img.sofascore.com/api/v1/player/870762/image", position: { top: "50%", left: "82%" } },
];

const SearchBar: React.FC = () => (
  <div className="relative mb-6">
    <MagnifyingGlassIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-lines" />
    <input
      type="text"
      placeholder="Buscar"
      className="w-full h-12 bg-transparent border border-lines rounded-lg text-light pl-12 outline-none"
    />
  </div>
);

// --- Dados mockados para os carrosséis ---
const statsData = [
    { xG: "23.1", BCM: "25", Nota: "7.39", BCC: "36", SOGM: "5.4" },
    { xG: "19.8", BCM: "18", Nota: "6.92", BCC: "27", SOGM: "4.7" },
    { xG: "27.5", BCM: "30", Nota: "7.81", BCC: "42", SOGM: "6.1" },
];

const playersData = [
    [
      { id: 1, name: "Jefferson Savarino", role: "Meio-atacante", rating: "7.29", img: "https://img.sofascore.com/api/v1/player/874739/image" },
      { id: 2, name: "Marlon Freitas", role: "Volante", rating: "7.25", img: "https://img.sofascore.com/api/v1/player/840202/image" },
      { id: 3, name: "Artur", role: "Ponta direita", rating: "7.20", img: "https://img.sofascore.com/api/v1/player/841128/image" },
    ],
    [
      { id: 4, name: "Jair", role: "Zagueiro", rating: "7.17", img: "https://img.sofascore.com/api/v1/player/1170722/image" },
      { id: 5, name: "Gregore", role: "Volante", rating: "7.17", img: "https://img.sofascore.com/api/v1/player/840276/image" },
      { id: 6, name: "John", role: "Goleiro", rating: "7.15", img: "https://img.sofascore.com/api/v1/player/840103/image" },
    ],
    [
      { id: 7, name: "Alex Telles", role: "Lateral esquerdo", rating: "7.13", img: "https://img.sofascore.com/api/v1/player/312110/image" },
      { id: 8, name: "Alexander Barboza", role: "Zagueiro", rating: "7.12", img: "https://img.sofascore.com/api/v1/player/801044/image" },
      { id: 9, name: "Vitinho", role: "Lateral direito", rating: "7.03", img: "https://img.sofascore.com/api/v1/player/914477/image" },
    ],
];

const recentGamesData = [
    [
        { id: 1, result: "0-1", resultColor: "bg-red", opponentImg: "https://img.sofascore.com/api/v1/team/1963/image" },
        { id: 2, result: "1-3", resultColor: "bg-green", opponentImg: "https://img.sofascore.com/api/v1/team/1980/image" },
        { id: 3, result: "2-0", resultColor: "bg-green", opponentImg: "https://img.sofascore.com/api/v1/team/1999/image" },
    ],
    [
        { id: 4, result: "2-2", resultColor: "bg-gray-500", opponentImg: "https://img.sofascore.com/api/v1/team/1961/image" },
        { id: 5, result: "1-0", resultColor: "bg-green", opponentImg: "https://img.sofascore.com/api/v1/team/1977/image" },
        { id: 6, result: "3-1", resultColor: "bg-red", opponentImg: "https://img.sofascore.com/api/v1/team/1957/image" },
    ]
];

const nextGamesData = [
    { id: 1, time: "20:30", day: "Amanhã", homeImg: "https://img.sofascore.com/api/v1/team/1958/image", awayImg: "https://img.sofascore.com/api/v1/team/1974/image" },
    { id: 2, time: "16:00", day: "Sábado", homeImg: "https://img.sofascore.com/api/v1/team/1981/image", awayImg: "https://img.sofascore.com/api/v1/team/1958/image" },
    { id: 3, time: "18:30", day: "22/09", homeImg: "https://img.sofascore.com/api/v1/team/1958/image", awayImg: "https://img.sofascore.com/api/v1/team/21982/image" },
];

export default function RightSidebarDeTime() {
    const [statIndex, setStatIndex] = useState(0);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [recentGameIndex, setRecentGameIndex] = useState(0);
    const [nextGameIndex, setNextGameIndex] = useState(0);

    const prevStat = () => setStatIndex((prev) => (prev - 1 + statsData.length) % statsData.length);
    const nextStat = () => setStatIndex((prev) => (prev + 1) % statsData.length);

    const prevPlayer = () => setPlayerIndex((prev) => (prev - 1 + playersData.length) % playersData.length);
    const nextPlayer = () => setPlayerIndex((prev) => (prev + 1) % playersData.length);

    const prevRecentGame = () => setRecentGameIndex((prev) => (prev - 1 + recentGamesData.length) % recentGamesData.length);
    const nextRecentGame = () => setRecentGameIndex((prev) => (prev + 1) % recentGamesData.length);

    const prevNextGame = () => setNextGameIndex((prev) => (prev - 1 + nextGamesData.length) % nextGamesData.length);
    const nextNextGame = () => setNextGameIndex((prev) => (prev + 1) % nextGamesData.length);

  return (
    <aside className="p-6 min-h-screen">
      <SearchBar />

      <div className="border border-lines rounded-lg p-4 flex flex-col text-light ">
        <p className="text-center font-semibold">Estatísticas da Temporada</p>
        <div className="flex gap-2 items-center mt-2">
          <img
            src="https://images.fotmob.com/image_resources/logo/leaguelogo/dark/268.png"
            className="size-8 object-cover"
            alt="Brasileirão Betano"
          />
          <p className="text-sm font-semibold">Brasileirão Betano 2025</p>
        </div>

        <div className="flex justify-end gap-1 mt-0.5 px-2 mb-0.5">
          <p className="text-xs text-lines w-8 text-center font-semibold">PJ</p>
          <p className="text-xs text-lines w-12 text-center font-semibold">+/-</p>
          <p className="text-xs text-lines w-8 text-center font-semibold">SG</p>
          <p className="text-xs text-lines w-8 text-center font-semibold">PTS</p>
        </div>

        <div className="relative flex gap-2 items-center justify-between bg-pdark px-2 py-1 rounded-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-yellow-400 before:rounded-l-lg">
          <div className="ml-2 flex gap-2 items-center text-light">
            <p>5</p>
            <img
              src="https://images.fotmob.com/image_resources/logo/teamlogo/8517_xsmall.png"
              className="size-5 object-cover"
              alt="Botafogo"
            />
            <p className="font-semibold">Botafogo</p>
          </div>
          <div className="flex gap-1 items-center">
            <p className="w-8 text-center">17</p>
            <p className="w-12 text-center">23-10</p>
            <p className="w-8 text-center">+13</p>
            <p className="w-8 text-center font-semibold">29</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="mt-4 bg-pdark px-4 py-2 rounded-lg flex-1">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Jogos Recentes</p>
                <div className="flex items-center gap-1">
                  <button onClick={prevRecentGame} className="p-1 hover:bg-pdark/50 rounded-lg cursor-pointer">
                    <CaretLeftIcon />
                  </button>
                  <button onClick={nextRecentGame} className="p-1 hover:bg-pdark/50 rounded-lg cursor-pointer">
                    <CaretRightIcon />
                  </button>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={recentGameIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 flex gap-4 items-center"
                >
                {recentGamesData[recentGameIndex].map((game) => (
                  <div key={game.id} className="flex flex-col items-center gap-1">
                    <p className={`${game.resultColor} px-2 rounded-lg font-semibold text-xs text-dark`}>{game.result}</p>
                    <img
                      src={game.opponentImg}
                      className="size-10 object-cover"
                      alt="Time adversário"
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 bg-pdark px-4 py-2 rounded-lg sm:w-[180px]">
             <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Próximos Jogos</p>
                <div className="flex items-center gap-1">
                    <button onClick={prevNextGame} className="p-1 hover:bg-pdark/50 rounded-lg cursor-pointer">
                        <CaretLeftIcon />
                    </button>
                    <button onClick={nextNextGame} className="p-1 hover:bg-pdark/50 rounded-lg cursor-pointer">
                        <CaretRightIcon />
                    </button>
                </div>
            </div>
            <AnimatePresence mode="wait">
                <motion.div
                    key={nextGameIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 flex gap-2.5 items-center justify-center"
                >
                    <img
                        src={nextGamesData[nextGameIndex].homeImg}
                        className="size-10 object-cover"
                        alt="Time da casa"
                    />
                    <div className="flex flex-col text-center">
                        <p className="text-sm font-semibold">{nextGamesData[nextGameIndex].time}</p>
                        <p className="text-xs font-semibold">{nextGamesData[nextGameIndex].day}</p>
                    </div>
                    <img
                        src={nextGamesData[nextGameIndex].awayImg}
                        className="size-10 object-cover"
                        alt="Time visitante"
                    />
                </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- SEÇÃO DA FORMAÇÃO --- */}
        <div className="mt-4">
          <p className="font-semibold">Última formação : 4-2-3-1</p>
          <div className="mt-2">
            <SoccerField 
              players={players4231} 
              fieldImageUrl="/field.jpeg" 
            />
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex gap-2 items-center">
            <img src="https://img.sofascore.com/api/v1/manager/810354/image" className="size-8 rounded-full"/>
            <p className="text-light text-sm">Técnico: Davide Ancelloti</p>
            </div>
            
            {/* --- SEÇÃO DE ESTATÍSTICAS COM ANIMAÇÃO --- */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Estatísticas</p>
                  <InfoIcon />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={prevStat} className="p-1 hover:bg-pdark rounded-lg cursor-pointer">
                    <CaretLeftIcon />
                  </button>
                  <button onClick={nextStat} className="p-1 hover:bg-pdark rounded-lg cursor-pointer">
                    <CaretRightIcon />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={statIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2.5 grid grid-cols-5 gap-2 text-center"
                >
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{statsData[statIndex].xG}</p>
                    <p className="text-xs text-lines">xG</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{statsData[statIndex].BCM}</p>
                    <p className="text-xs text-lines">BCM</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="px-2 bg-green rounded-lg text-sm text-dark font-semibold">
                      {statsData[statIndex].Nota}
                    </p>
                    <p className="text-xs text-lines">Nota</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{statsData[statIndex].BCC}</p>
                    <p className="text-xs text-lines">BCC</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm">{statsData[statIndex].SOGM}</p>
                    <p className="text-xs text-lines">SOG/M</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* --- SEÇÃO MELHORES JOGADORES COM ANIMAÇÃO --- */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Melhores jogadores</p>
                <div className="flex items-center gap-1">
                  <button onClick={prevPlayer} className="p-1 hover:bg-pdark rounded-lg cursor-pointer">
                    <CaretLeftIcon />
                  </button>
                  <button onClick={nextPlayer} className="p-1 hover:bg-pdark rounded-lg cursor-pointer">
                    <CaretRightIcon />
                  </button>
                </div>
              </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={playerIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 flex flex-col gap-2"
                    >
                        {playersData[playerIndex].map((p) => (
                        <div
                            key={p.id}
                            className="flex items-center justify-between bg-pdark p-2 rounded-lg cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                            <img src={p.img} alt={p.name} className="size-8 rounded-full" />
                            <div className="flex flex-col">
                                <p className="text-sm font-semibold">{p.name}</p>
                                <p className="text-xs">{p.role}</p>
                            </div>
                            </div>
                            <p className="px-2 py-0.5 bg-green rounded-lg text-sm font-semibold text-dark">
                            {p.rating}
                            </p>
                        </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

