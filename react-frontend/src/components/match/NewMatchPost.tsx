// src/components/match/NewMatchPost.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SmileyIcon,
  ImageSquareIcon,
  GifIcon,
  AlignLeftIcon,
  XIcon,
} from "@phosphor-icons/react";

// --- TIPOS (para organização, igual no Modal) ---
interface GiphyGif {
  id: string;
  title: string;
  images: {
    fixed_height_small: { url: string };
  };
}

// --- COMPONENTE PRINCIPAL ---
export default function NewMatchPost() {
  // --- STATE MANAGEMENT ---
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [selectedGif, setSelectedGif] = useState<GiphyGif | null>(null);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  // Controladores de visibilidade
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  
  // State para o seletor de GIFs
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState<GiphyGif[]>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // --- IMAGE HANDLING ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files).slice(0, 4 - images.length);
    setImages([...images, ...newFiles]);
    setSelectedGif(null); // Limpa o GIF se uma imagem for adicionada
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // --- GIF HANDLING ---
  const searchGiphy = async (query: string) => {
    if (!query) return;
    try {
      // IMPORTANTE: Substitua pela sua chave de API do Giphy
      const GIPHY_API_KEY = "qT3qyyEmkgbTQZSKYvhHPoxNroXOF7QY"; 
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=12&rating=g`
      );
      const data = await res.json();
      setGifResults(data.data);
    } catch (err) {
      console.error("Falha ao buscar GIFs:", err);
    }
  };

  useEffect(() => {
    if (gifSearch) {
      const timeout = setTimeout(() => searchGiphy(gifSearch), 400);
      return () => clearTimeout(timeout);
    } else {
      setGifResults([]);
    }
  }, [gifSearch]);

  const selectGif = (gif: GiphyGif) => {
    setSelectedGif(gif);
    setImages([]); // Limpa imagens se um GIF for adicionado
    setShowGifPicker(false);
  };
  
  // --- POLL HANDLING ---
  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };
  
  // --- EMOJI HANDLING ---
  const emojiCategories = {
    Reações: ["😀", "😂", "🥰", "😎", "🤔", "😢", "😡", "😭"],
    Futebol: ["⚽", "🥅", "🏆", "🏟️", "👟", "📣", "🟥", "🟨"],
  };

  const addEmoji = (emoji: string) => {
    setText((prev) => prev + emoji);
    setShowEmojiPicker(false);
    textAreaRef.current?.focus();
  };
  
  // --- RENDERIZAÇÃO ---
  return (
    <div className="w-full rounded-lg border border-lines p-4 flex flex-col gap-3 focus-within:border-orange transition-colors">
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Como está o jogo?"
        className="w-full bg-transparent text-light placeholder:text-lines focus:outline-none resize-none"
        rows={2}
      ></textarea>

      {/* --- PREVIEWS (IMAGENS E GIF) --- */}
      {images.length > 0 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {images.map((img, i) => (
            <div key={i} className="relative w-24 h-24 flex-shrink-0">
              <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover rounded-md" />
              <button onClick={() => handleRemoveImage(i)} className="absolute top-1 right-1 bg-black/60 text-light rounded-full p-0.5 hover:bg-red-600 transition-colors cursor-pointer">
                <XIcon size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedGif && (
        <div className="relative mt-2 w-48 h-48">
          <img src={selectedGif.images.fixed_height_small.url} alt={selectedGif.title} className="w-full h-full object-cover rounded-md" />
          <button onClick={() => setSelectedGif(null)} className="absolute top-1 right-1 bg-black/60 text-light rounded-full p-0.5 hover:bg-red-600 transition-colors cursor-pointer">
            <XIcon size={14} />
          </button>
        </div>
      )}

      {/* --- PICKERS (EMOJI, GIF, POLL) --- */}
      {showEmojiPicker && (
         <div className="flex flex-col gap-2 border-t border-lines pt-3 animate-fadeIn">
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <div key={category}>
              <p className="text-sm text-lines mb-1">{category}</p>
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji) => (
                  <button key={emoji} onClick={() => addEmoji(emoji)} className="text-lg hover:bg-lines/20 rounded-md p-1 transition-colors cursor-pointer">
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showGifPicker && (
        <div className="border-t border-lines pt-3 animate-fadeIn">
          <input type="text" value={gifSearch} onChange={(e) => setGifSearch(e.target.value)} placeholder="Buscar GIF no Giphy" className="w-full mb-2 p-2 rounded-md bg-background border border-lines text-light focus:outline-none"/>
          <div className="grid grid-cols-3 gap-2 h-48 overflow-y-auto">
            {gifResults.map((gif) => (
              <img key={gif.id} src={gif.images.fixed_height_small.url} alt={gif.title} className="w-full h-full object-cover rounded-md cursor-pointer hover:opacity-80" onClick={() => selectGif(gif)} />
            ))}
          </div>
        </div>
      )}

      {showPoll && (
         <div className="border-t border-lines pt-3 flex flex-col gap-2 animate-fadeIn">
          {pollOptions.map((option, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input type="text" value={option} onChange={(e) => updatePollOption(idx, e.target.value)} className="flex-1 py-1 px-2 rounded-md bg-background border border-lines text-light focus:outline-none" placeholder={`Opção ${idx + 1}`} />
              {pollOptions.length > 2 && (
                <button onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-400 transition-colors cursor-pointer">
                  <XIcon size={18} />
                </button>
              )}
            </div>
          ))}
          {pollOptions.length < 5 && (
            <button onClick={() => setPollOptions([...pollOptions, ""])} className="text-sm text-orange hover:underline transition-colors cursor-pointer self-start">
              + Adicionar opção
            </button>
          )}
        </div>
      )}
      
      {/* --- BARRA DE FERRAMENTAS --- */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1 text-lines">
          {/* UX: Adicionado padding, borda arredondada no hover e cursor-pointer */}
          <button onClick={() => document.getElementById("newMatchPostImageInput")?.click()} className="p-2 rounded-full hover:bg-lines/20 hover:text-light transition-colors cursor-pointer" title="Imagem">
            <ImageSquareIcon size={20} />
            <input type="file" id="newMatchPostImageInput" className="hidden" multiple accept="image/*" onChange={handleImageChange} />
          </button>
          <button onClick={() => setShowEmojiPicker(p => !p)} className="p-2 rounded-full hover:bg-lines/20 hover:text-light transition-colors cursor-pointer" title="Emoji">
            <SmileyIcon size={20} />
          </button>
          <button onClick={() => setShowGifPicker(p => !p)} className="p-2 rounded-full hover:bg-lines/20 hover:text-light transition-colors cursor-pointer" title="GIF">
            <GifIcon size={20} />
          </button>
          <button onClick={() => setShowPoll(p => !p)} className="p-2 rounded-full hover:bg-lines/20 hover:text-light transition-colors cursor-pointer" title="Enquete">
            <AlignLeftIcon size={20} />
          </button>
        </div>
        <button className="bg-orange text-light font-bold px-6 py-1.5 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={!text.trim() && images.length === 0 && !selectedGif}
        >
          Postar
        </button>
      </div>
    </div>
  );
}