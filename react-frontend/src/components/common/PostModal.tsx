import React, { useState, useEffect, useRef } from "react";
import {
  XIcon,
  SmileyIcon,
  ChartLineUpIcon,
  ImageSquareIcon,
  GifIcon,
  AlignLeftIcon,
} from "@phosphor-icons/react";

interface PostModalProps {
  onClose: () => void;
  profiles: string[];
}

interface LinkPreview {
  title: string;
  description: string;
  image?: string;
  site?: string;
}

interface GiphyGif {
  id: string;
  url: string;
  title: string;
  images: {
    fixed_height_small: { url: string };
  };
}

export default function PostModal({ onClose, profiles }: PostModalProps) {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState<LinkPreview | null>(null);
  const [previewLink, setPreviewLink] = useState("");
  const [previewRemoved, setPreviewRemoved] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [selectedGif, setSelectedGif] = useState<GiphyGif | null>(null);
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState<GiphyGif[]>([]);
  const [showGifPicker, setShowGifPicker] = useState(false);

  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [showLineup, setShowLineup] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0] || "");

  /** --- LÓGICA DE PREVIEW PERSISTENTE --- */
  useEffect(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const firstLinkInText = text.match(urlRegex)?.[0] || null;

    // Se um link novo e diferente for encontrado no texto, ele se torna o novo link ativo.
    if (firstLinkInText && firstLinkInText !== previewLink) {
      setPreviewLink(firstLinkInText);
      setPreview(null);
      setPreviewRemoved(false);
    }

    // Condições para MOSTRAR o preview
    const shouldShowPreview =
      previewLink && images.length === 0 && !selectedGif && !previewRemoved;

    if (shouldShowPreview) {
      if (!preview && !loadingPreview) {
        setLoadingPreview(true);
        fetch(`/api/preview?url=${encodeURIComponent(previewLink)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.title) setPreview(data);
            else setPreview(null);
          })
          .catch(() => setPreview(null))
          .finally(() => setLoadingPreview(false));
      }
    } else {
      // Condições para ESCONDER o preview
      if (preview) {
        setPreview(null);
      }
    }
  }, [
    text,
    images,
    selectedGif,
    previewLink,
    preview,
    previewRemoved,
    loadingPreview,
  ]);

  /** --- Adicionar Imagem (com lógica de reinserir o link) --- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // Se temos um link memorizado que não está no texto, adiciona ele de volta.
    if (previewLink && !text.includes(previewLink)) {
      setText((prevText) => `${prevText} ${previewLink}`.trim());
    }

    const newFiles = Array.from(e.target.files).slice(0, 4 - images.length);
    setImages([...images, ...newFiles]);
    setSelectedGif(null);
  };

  /** --- Remover Imagem --- */
  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
    // O useEffect cuidará de trazer o preview de volta automaticamente.
  };

  /** --- Enquete --- */
  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  /** --- Emoji --- */
  const addEmoji = (emoji: string) => {
    setText((prev) => prev + emoji);
    textAreaRef.current?.focus();
  };

  /** --- GIF Giphy --- */
  const searchGiphy = async (query: string) => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=qT3qyyEmkgbTQZSKYvhHPoxNroXOF7QY&q=${encodeURIComponent(
          query
        )}&limit=10&rating=g`
      );
      const data = await res.json();
      setGifResults(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (gifSearch) {
      const timeout = setTimeout(() => searchGiphy(gifSearch), 400);
      return () => clearTimeout(timeout);
    } else setGifResults([]);
  }, [gifSearch]);

  const emojiCategories = {
    Sorrisos: ["😀", "😂", "🥰", "😎", "🤔", "😢", "😡", "😭"],
    Comida: ["🍎", "🍕", "🍔", "🍣", "🍩", "☕"],
    Animais: ["🐶", "🐱", "🦊", "🐼", "🐨", "🐸"],
    Atividades: ["⚽", "🏀", "🎮", "🎸", "🎧", "🏄‍♂️"],
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/80 animate-fadeIn"
        onClick={onClose}
      />
      <div className="relative w-[600px] max-w-full rounded-lg border border-[#3F3834] shadow-xl bg-gradient-to-b from-[#060606] to-[#151515] p-6 z-50 animate-scaleIn overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#CABDB3]">Criar post</h2>
          <button
            onClick={onClose}
            className="text-[#CABDB3] hover:text-light cursor-pointer"
          >
            <XIcon size={24} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex gap-3 mb-3 text-[#CABDB3] text-opacity-60">
          <button
            onClick={() => document.getElementById("imageInput")?.click()}
            title="Imagem"
            className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ImageSquareIcon size={20} />
            <input
              type="file"
              id="imageInput"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </button>
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            title="Emoji"
            className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <SmileyIcon size={20} />
          </button>
          <button
            onClick={() => setShowGifPicker((prev) => !prev)}
            title="GIF"
            className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <GifIcon size={20} />
          </button>
          <button
            onClick={() => setShowPoll((prev) => !prev)}
            title="Enquete"
            className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <AlignLeftIcon size={20} />
          </button>
          <button
            onClick={() => setShowLineup((prev) => !prev)}
            title="Escalação"
            className="p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ChartLineUpIcon size={20} />
          </button>
        </div>

        {/* Emoji & GIF Pickers */}
        {showEmojiPicker && (
          <div className="mb-2 flex flex-col gap-2 border border-[#3F3834] p-2 rounded-lg bg-[#0C0C0C]">
            {Object.entries(emojiCategories).map(([cat, emojis]) => (
              <div key={cat}>
                <p className="text-sm text-lines mb-1">{cat}</p>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="text-lg hover:bg-[#151515] rounded-md p-1 transition-colors cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {showGifPicker && (
          <div className="mb-2 border border-[#3F3834] rounded-lg bg-[#0C0C0C] p-2">
            <input
              type="text"
              value={gifSearch}
              onChange={(e) => setGifSearch(e.target.value)}
              placeholder="Buscar GIF"
              className="w-full mb-2 p-2 rounded-md bg-[#151515] text-light focus:outline-none"
            />
            <div className="flex gap-2 overflow-x-auto">
              {gifResults.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.images.fixed_height_small.url}
                  alt={gif.title}
                  className="w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-80"
                  onClick={() => {
                    setSelectedGif(gif);
                    setShowGifPicker(false);
                    setImages([]);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Link Preview */}
        {loadingPreview && (
          <div className="text-center text-sm text-lines my-4">
            Carregando preview...
          </div>
        )}
        {preview && (
          <div className="mb-3 border border-[#3F3834] rounded-lg overflow-hidden bg-[#0C0C0C] p-3 flex gap-3 relative">
            {preview.image && (
              <img
                src={preview.image}
                alt={preview.title}
                className="w-24 h-24 object-cover rounded-md"
              />
            )}
            <div>
              <h3 className="text-light font-medium line-clamp-2">
                {preview.title}
              </h3>
              <p className="text-sm text-lines line-clamp-2">
                {preview.description}
              </p>
              <span className="text-xs text-light mt-1 block">
                {preview.site}
              </span>
            </div>
            <button
              onClick={() => setPreviewRemoved(true)}
              className="absolute top-2 right-2 text-gray-400 hover:text-light transition-colors cursor-pointer"
            >
              <XIcon size={16} />
            </button>
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[100px] rounded-lg border border-[#3F3834] bg-transparent text-light p-3 focus:outline-none focus:border-[#B5310E] resize-none"
          placeholder="O que está acontecendo?"
        />

        {/* Enquete */}
        {showPoll && (
          <div className="mb-3 mt-3 border border-[#3F3834] rounded-lg p-3 bg-[#0C0C0C]">
            <h4 className="text-light mb-2 font-medium">Enquete</h4>
            {pollOptions.map((option, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updatePollOption(idx, e.target.value)}
                  className="flex-1 py-1 px-2 rounded-md bg-[#151515] border border-[#3F3834] text-light focus:outline-none"
                  placeholder={`Opção ${idx + 1}`}
                />
                {pollOptions.length > 2 && (
                  <button
                    onClick={() =>
                      setPollOptions(pollOptions.filter((_, i) => i !== idx))
                    }
                    className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <XIcon size={18} />
                  </button>
                )}
              </div>
            ))}
            {pollOptions.length < 5 && (
              <button
                onClick={() => setPollOptions([...pollOptions, ""])}
                className="text-sm text-[#B5310E] hover:text-[#97250B] transition-colors cursor-pointer"
              >
                + Adicionar opção
              </button>
            )}
          </div>
        )}

        {/* Preview de imagens */}
        {images.length > 0 && (
          <div className="flex gap-2 mt-3 mb-3 overflow-x-auto">
            {images.map((img, i) => (
              <div key={i} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 bg-black/60 text-light rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <XIcon size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* GIF Preview */}
        {selectedGif && (
          <div className="relative mt-3 w-48 h-48">
            <img
              src={selectedGif.images.fixed_height_small.url}
              alt={selectedGif.title}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              onClick={() => setSelectedGif(null)}
              className="absolute top-1 right-1 bg-black/60 text-light rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
            >
              <XIcon size={16} />
            </button>
          </div>
        )}

        {/* Seleção de perfil e Botões Finais */}
        <select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
          className="w-full mt-2 py-2 px-4 rounded-md border border-[#3F3834] bg-[#151515] text-light focus:outline-none cursor-pointer"
        >
          {profiles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-4 py-2 bg-[#3F3834] rounded-lg hover:opacity-80 transition-all text-light cursor-pointer">
            Salvar rascunho
          </button>
          <button className="px-4 py-2 bg-[#B5310E] rounded-lg hover:bg-[#97250B] transition-all text-light cursor-pointer">
            Postar
          </button>
        </div>
      </div>
    </div>
  );
}