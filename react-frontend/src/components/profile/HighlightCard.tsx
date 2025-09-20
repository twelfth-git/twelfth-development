"use client";
import React from "react";

export default function HighlightCard() {
  return (
    <div className="mt-4 ml-8 relative w-[528px] h-[180px] rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer">
      {/* Fundo com imagem */}
      <img
        src="https://uk.lapresse.it/wp-content/uploads/2025/06/01/champions-league-ousmane-dembele-named-best-player-of-the-tournament-scaled.jpg"
        alt="champions"
        className="absolute inset-0 w-full h-full object-cover contrast-125 brightness-75"
      />

      {/* Badge com efeito de vidro */}
      <div className="absolute top-4 left-4 px-4 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-semibold text-light shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        PLUS GRANDE RÉUSSITE
      </div>

      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-bold text-light drop-shadow-lg">
          CHAMPIONS d’EUROPE
        </h1>
        <p className="text-lg text-light">31/05/2021</p>
      </div>

      {/* Mensagem inferior esquerda */}
      <div className="absolute bottom-2 right-4 text-sm text-light max-w-[70%]">
        <p>Ce n’est plus un rêve...</p>
        <p>On écrit l’histoire ensemble, ALLEZ PARIS !!!</p>
      </div>
    </div>
  );
}
