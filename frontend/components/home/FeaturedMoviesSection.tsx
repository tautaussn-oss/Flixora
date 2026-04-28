"use client";

import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Film,
  Star,
} from "lucide-react";
import type { HomeMovie } from "./home-types";

type FeaturedMoviesSectionProps = {
  movies: HomeMovie[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onWatch: (movie: HomeMovie) => void;
};

export default function FeaturedMoviesSection({
  movies,
  loading = false,
  error = null,
  onRetry,
  onWatch,
}: FeaturedMoviesSectionProps) {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const railRef = useRef<HTMLDivElement | null>(null);

  const years = useMemo(() => {
    return Array.from(new Set(movies.map((movie) => movie.year)))
      .filter((year) => Number.isFinite(year) && year > 0)
      .sort((a, b) => b - a)
      .slice(0, 10);
  }, [movies]);

  const filtered = useMemo(() => {
    const byYear =
      selectedYear === "all"
        ? movies
        : movies.filter((movie) => String(movie.year) === selectedYear);

    const sorted = [...byYear].sort((a, b) => {
      if (a.featured !== b.featured) {
        return Number(b.featured) - Number(a.featured);
      }

      return sortOrder === "latest" ? b.year - a.year : a.year - b.year;
    });

    return sorted.slice(0, 6);
  }, [movies, selectedYear, sortOrder]);

  const scrollRail = (direction: "left" | "right") => {
    if (!railRef.current) return;

    const scrollAmount = Math.max(
      360,
      Math.round(railRef.current.clientWidth * 0.78),
    );
    railRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="featured-movies" className="mx-auto mt-14 max-w-7xl">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            Featured Collection
          </p>

          <h2 className="text-2xl font-bold md:text-3xl">Featured Movies</h2>

          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Filter by release year, sort by latest or oldest, and browse with
            arrow controls.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollRail("left")}
            className="rounded-full border p-2.5 transition duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
            }}
            aria-label="Scroll featured movies left"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollRail("right")}
            className="rounded-full border p-2.5 transition duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface)",
            }}
            aria-label="Scroll featured movies right"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <FilterChip
          active={selectedYear === "all"}
          label="All Years"
          onClick={() => setSelectedYear("all")}
        />

        {years.map((year) => (
          <FilterChip
            key={year}
            active={selectedYear === String(year)}
            label={String(year)}
            onClick={() => setSelectedYear(String(year))}
          />
        ))}
      </div>

      <div className="mb-7 flex flex-wrap items-center gap-2.5">
        <FilterChip
          active={sortOrder === "latest"}
          label="Latest"
          onClick={() => setSortOrder("latest")}
        />
        <FilterChip
          active={sortOrder === "oldest"}
          label="Oldest"
          onClick={() => setSortOrder("oldest")}
        />
      </div>

      {loading ? (
        <SkeletonRail />
      ) : error ? (
        <div
          className="rounded-2xl border p-6"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {error}
          </p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Retry loading
            </button>
          ) : null}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="rounded-2xl border p-6 text-sm"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
            color: "var(--muted)",
          }}
        >
          No featured movies found for this release year.
        </div>
      ) : (
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filtered.map((movie, index) => (
            <article
              key={movie.id}
              className="home-card-glow home-stagger-item relative w-[86vw] min-w-[86vw] snap-start overflow-hidden rounded-3xl border sm:w-[64vw] sm:min-w-[64vw] lg:w-107.5 lg:min-w-107.5"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
                animationDelay: `${index * 70}ms`,
              }}
            >
              <div
                className="relative h-56"
                style={{
                  backgroundImage: `url(${movie.posterUrl})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/82 via-black/32 to-black/8" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {movie.featured ? "Featured" : "Movie"}
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {movie.genre}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="line-clamp-1 text-xl font-bold">
                    {movie.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-white/80">
                    {movie.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 p-4">
                <div
                  className="flex flex-wrap items-center gap-3 text-xs"
                  style={{ color: "var(--muted)" }}
                >
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} /> {movie.year || "N/A"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={14} />{" "}
                    {movie.duration ? `${movie.duration} min` : "N/A"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star size={14} /> IMDb
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onWatch(movie)}
                  disabled={!movie.trailerUrl}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundColor: "var(--accent)",
                    boxShadow: "var(--shadow-accent)",
                  }}
                >
                  <Film size={15} />
                  Watch Trailer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function SkeletonRail() {
  return (
    <div className="flex gap-5 overflow-hidden">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="w-[86vw] min-w-[86vw] rounded-3xl border p-4 sm:w-[64vw] sm:min-w-[64vw] lg:w-107.5 lg:min-w-107.5"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <div className="skeleton-shimmer h-56 rounded-2xl" />
          <div className="skeleton-shimmer mt-4 h-5 w-2/3 rounded" />
          <div className="skeleton-shimmer mt-2 h-4 w-full rounded" />
          <div className="skeleton-shimmer mt-2 h-4 w-5/6 rounded" />
          <div className="skeleton-shimmer mt-4 h-10 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border px-4 py-2 text-sm font-medium transition duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: active ? "transparent" : "var(--border)",
        backgroundColor: active ? "var(--accent)" : "var(--surface)",
        color: active ? "white" : "var(--text)",
        boxShadow: active ? "var(--shadow-accent)" : "none",
      }}
    >
      {label}
    </button>
  );
}
