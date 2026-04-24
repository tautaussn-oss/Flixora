"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MovieRailCard from "./MovieRailCard";
import type { Movie } from "./types";

type MoviesRailProps = {
  movies: Movie[];
  onTrailerClick: (movie: Movie) => void;
};

export default function MoviesRail({ movies, onTrailerClick }: MoviesRailProps) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!railRef.current) return;

    const amount = Math.max(340, Math.round(railRef.current.clientWidth * 0.82));
    railRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-7">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Use the arrows to scroll through the full movie list.
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="rounded-full border p-2.5 transition hover:-translate-y-0.5"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            aria-label="Scroll movies left"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="rounded-full border p-2.5 transition hover:-translate-y-0.5"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            aria-label="Scroll movies right"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="snap-start"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MovieRailCard movie={movie} onTrailerClick={onTrailerClick} />
          </div>
        ))}
      </div>
    </section>
  );
}
