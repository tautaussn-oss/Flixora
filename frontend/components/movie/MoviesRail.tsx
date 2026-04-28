"use client";

import { useMemo, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MovieRailCard from "./MovieRailCard";
import type { Movie } from "./types";

type MoviesRailProps = {
  movies: Movie[];
  onTrailerClick: (movie: Movie) => void;
};

export default function MoviesRail({ movies, onTrailerClick }: MoviesRailProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const featuredSlice = useMemo(() => movies.slice(0, 5), [movies]);

  const scroll = (direction: "left" | "right") => {
    if (!railRef.current) return;

    const amount = Math.max(340, Math.round(railRef.current.clientWidth * 0.82));
    railRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold">Catalog grid</h3>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Poster-first layout inspired by the Figma screen, but fed from the live movie catalog.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
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
        className="grid auto-cols-[minmax(220px,1fr)] grid-flow-col gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:auto-cols-[220px]"
      >
        {movies.map((movie) => (
          <MovieRailCard key={movie.id} movie={movie} onTrailerClick={onTrailerClick} />
        ))}
      </div>

      {featuredSlice.length > 0 ? (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredSlice.slice(0, 3).map((movie) => (
            <div
              key={`spotlight-${movie.id}`}
              className="rounded-[1.75rem] border p-4"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
                Cast Cue
              </p>
              <h4 className="mt-3 text-lg font-semibold">{movie.title}</h4>
              <p className="mt-2 line-clamp-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
                {movie.actors.slice(0, 3).join(", ") || "Cast details coming soon."}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
