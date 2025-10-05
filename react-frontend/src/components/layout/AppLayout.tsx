import Sidebar from "@/components/common/Sidebar";
import GlassMenu from "@/components/common/GlassMenu";
import React from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* A Sidebar fica fixa à esquerda */}
      <Sidebar />

      {/* O contêiner principal ocupa o espaço restante */}
      <main className="flex-1 max-w-[1320px] mx-auto mt-4">
        {/* 'children' renderiza o conteúdo específico da página aqui */}
        {children}
        
        {/* O menu flutuante é incluído por padrão */}
        <GlassMenu />
      </main>
    </div>
  );
}