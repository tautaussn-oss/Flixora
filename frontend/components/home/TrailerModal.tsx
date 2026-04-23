"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type TrailerModalProps = {
  open: boolean;
  trailerUrl: string;
  title: string;
  onClose: () => void;
};

function toEmbedUrl(url: string) {
  if (!url) return "";

  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );

  if (youtubeMatch?.[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`;
  }

  return url;
}

function isDirectVideo(url: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

export default function TrailerModal({
  open,
  trailerUrl,
  title,
  onClose,
}: TrailerModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const embedUrl = toEmbedUrl(trailerUrl);
  const renderVideoTag = isDirectVideo(trailerUrl);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/72 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl overflow-hidden rounded-2xl border"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface-strong)",
          boxShadow: "var(--shadow-medium)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-3 md:px-5"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="line-clamp-1 text-base font-semibold md:text-lg">{title} Trailer</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close trailer modal"
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <X size={18} />
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          {renderVideoTag ? (
            <video
              key={trailerUrl}
              src={trailerUrl}
              className="h-full w-full"
              controls
              autoPlay
            />
          ) : embedUrl ? (
            <iframe
              key={embedUrl}
              src={embedUrl}
              title={`${title} Trailer`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
              Trailer unavailable.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
