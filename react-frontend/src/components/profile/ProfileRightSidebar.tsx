"use client";

import React from "react";
// Importe os ícones que você vai usar
import { MagnifyingGlassIcon, ShieldStarIcon } from "@phosphor-icons/react";

// Componente da Barra de Busca (copiado do seu outro arquivo)
const SearchBar: React.FC = () => (
    <div className="relative mb-6">
        <MagnifyingGlassIcon
            size={22}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-lines"
        />
        <input
            type="text"
            placeholder="Buscar" // Placeholder atualizado para o contexto
            className="w-full h-12 bg-transparent border border-lines rounded-lg text-light pl-12 outline-none"
        />
    </div>
);

// Seu novo componente para a sidebar de time
export default function ProfileRightSidebar() {
    return (
        <aside className="p-6 min-h-screen">
            {/* 1. Barra de busca adicionada aqui */}
            <SearchBar />

            {/* 2. Caixa de conteúdo vazia com um placeholder */}
            <div className="border border-lines rounded-lg p-4 flex flex-col items-center justify-center text-center text-light h-[500px]">
                
            </div>
        </aside>
    );
}