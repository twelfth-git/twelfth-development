// src/components/match/MatchTabs.tsx
"use client";

import React, { useState } from "react";

export default function MatchTabs() {
  const [activeTab, setActiveTab] = useState("Principal");
  const tabs = ["Principal", "Formações", "Estatísticas", "Classificação", "Narração"];

  return (
    // O container pai permanece o mesmo
    <div className="flex items-center justify-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`
            min-w-[100px] px-4 py-1 rounded-lg border transition-all duration-500
            ${
              activeTab === tab
                ? "border-orange text-orange" // Estilo ativo (igual)
                : "border-light text-light" // Estilo inativo (atualizado de 'border-lines' para 'border-light')
            }
            hover:shadow-[0_0_12px_rgba(255,138,0,0.6)] cursor-pointer // Adicionado efeito de brilho no hover
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}