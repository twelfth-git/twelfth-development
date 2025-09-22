import React, { useState } from 'react';
import { MagnifyingGlassIcon, PencilSimpleLineIcon, HouseIcon, ShieldIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import PostModal from '@/components/common/PostModal'; // Importe o componente PostModal

export default function GlassMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigation = (path: string) => {
  window.location.href = path;
};

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* O overlay para escurecer o fundo, que é uma div com z-index menor que o modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={closeModal}
        ></div>
      )}

      {/* O modal de postagem, que agora usa o componente PostModal */}
      {isModalOpen && (
  <PostModal 
    onClose={closeModal} 
    profiles={["Meu Perfil", "Página X"]} // destinos do post
  />
)}

      {/* O seu menu de navegação GlassMenu permanece visível */}
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
          <button className="p-3 text-light/80 hover:text-light transition-colors cursor-pointer" onClick={openModal}>
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
    </>
  );
}