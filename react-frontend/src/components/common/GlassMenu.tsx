import React from 'react';
import { MagnifyingGlassIcon, PencilSimpleLineIcon, HouseIcon, ShieldIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";

export default function GlassMenu() {
  const handleNavigation = (path: string) => {
    // Redireciona para o caminho especificado
    window.location.href = path;
  };

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-lg z-50 shadow-2xl"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundImage: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
      }}
    >
      <div className="flex gap-6 items-center">
        {/* Ícone de Busca */}
        <button className="p-3 text-light/80 hover:text-light transition-colors cursor-pointer" onClick={() => handleNavigation('/search')}>
          <MagnifyingGlassIcon size={20} />
        </button>

        <span className="w-1 h-1 rounded-full bg-white/30"></span>

        {/* Ícone de Escrever */}
        <button className="p-3 text-light/80 hover:text-light transition-colors cursor-pointer" onClick={() => handleNavigation('/post')}>
          <PencilSimpleLineIcon size={20} />
        </button>

        <span className="w-1 h-1 rounded-full bg-white/30"></span>

        {/* Ícone de Home */}
        <button className="p-3 text-light/80 hover:text-light transition-colors cursor-pointer" onClick={() => handleNavigation('/home')}>
          <HouseIcon size={20} />
        </button>

        <span className="w-1 h-1 rounded-full bg-white/30"></span>

        {/* Ícone de Time */}
        <button className="p-3 text-light/80 hover:text-light transition-colors cursor-pointer" onClick={() => handleNavigation('/team')}>
          <ShieldIcon size={20} />
        </button>

        <span className="w-1 h-1 rounded-full bg-white/30"></span>

        {/* Ícone de Mensagens */}
        <button className="p-3 text-light/80 hover:text-light transition-colors cursor-pointer" onClick={() => handleNavigation('/messages')}>
          <EnvelopeSimpleIcon size={20} />
        </button>
      </div>
    </div>
  );
}