import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Play,
  Plus,
  Star,
} from "lucide-react";
import type { HomeMovie } from "./home-types";

type HomeHeroProps = {
  movies: HomeMovie[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  onWatch: (movie: HomeMovie) => void;
};

export default function HomeHero({
  movies,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
  onWatch,
}: HomeHeroProps) {
  const leadMovie = movies[activeIndex] ?? null;

  return (
    <section
      className="home-fade-up relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border"
      style={{
        borderColor: "var(--border)",
        boxShadow: "var(--shadow-medium)",
      }}
    >
      <div
        className="absolute inset-0 hero-bg-transition"
        style={{
          backgroundImage: `url(${leadMovie?.posterUrl ?? "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.03)",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/88 via-black/62 to-black/28" />
      <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/8 to-black/36" />

      <div className="relative min-h-130 p-8 md:p-10 lg:min-h-150 lg:p-12">
        <div className="max-w-2xl text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">
            Flixora Originals Style
          </p>

          <h1 className="home-fade-up-delay-1 mt-4 text-5xl font-extrabold uppercase tracking-wide md:text-6xl lg:text-7xl">
            {leadMovie?.title ?? "Featured Movie"}
          </h1>

          <div className="home-fade-up-delay-2 mt-5 flex flex-wrap items-center gap-4 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="text-yellow-300" /> 9.1
            </span>
            <span>{leadMovie?.year ?? "TBA"}</span>
            <span>{leadMovie?.genre ?? "Drama"}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} />
              {leadMovie?.duration ? `${leadMovie.duration} min` : "HD Preview"}
            </span>
          </div>

          <p className="home-fade-up-delay-2 mt-5 max-w-xl text-base leading-8 text-white/78 md:text-lg">
            {leadMovie?.description ??
              "Stream trailers and discover standout movies with a clean cinematic experience."}
          </p>

          <div className="home-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => leadMovie && onWatch(leadMovie)}
              disabled={!leadMovie?.trailerUrl}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Play size={16} /> Watch
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition duration-300 hover:bg-white/16"
            >
              <Plus size={16} /> Add List
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {movies.slice(0, 6).map((movie, index) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => onSelect(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-9 bg-white" : "w-5 bg-white/38"
                }`}
                aria-label={`Go to featured movie ${index + 1}`}
              />
            ))}
          </div>

          <p className="mt-6 text-sm text-white/70">
            Library size: {movies.length} movies
          </p>
        </div>

        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 gap-2 md:flex">
          <button
            type="button"
            onClick={onPrev}
            className="rounded-full border border-white/25 bg-black/25 p-2 text-white backdrop-blur transition hover:bg-black/40"
            aria-label="Previous hero movie"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="rounded-full border border-white/25 bg-black/25 p-2 text-white backdrop-blur transition hover:bg-black/40"
            aria-label="Next hero movie"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
