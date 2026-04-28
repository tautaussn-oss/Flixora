import Link from "next/link";
import { Clock3, Play, Plus, Star } from "lucide-react";
import type { Movie } from "./types";

type MovieRailCardProps = {
  movie: Movie;
  onTrailerClick: (movie: Movie) => void;
};

export default function MovieRailCard({
  movie,
  onTrailerClick,
}: MovieRailCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[1.35rem]">
      <div
        className="relative aspect-[0.7] overflow-hidden rounded-[1.35rem] border"
        style={{
          borderColor: "color-mix(in srgb, var(--border) 86%, transparent)",
          backgroundColor: "var(--card)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/20 to-black/10" />

        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-br-2xl rounded-tl-[1.35rem] border-r border-b text-white backdrop-blur-md">
          <Plus size={20} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-white/78">
            <span>{movie.genres[0] ?? "General"}</span>
            <span>{movie.year || "N/A"}</span>
          </div>

          <h3 className="mt-2 line-clamp-2 text-lg font-semibold">
            {movie.title}
          </h3>

          <div className="mt-3 flex items-center gap-3 text-xs text-white/75">
            <span className="inline-flex items-center gap-1">
              <Star size={13} className="text-yellow-300" />
              {Math.max(
                7.2,
                Math.min(9.6, 7.4 + movie.spotlightScore / 50),
              ).toFixed(1)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 size={13} />
              {movie.duration ? `${movie.duration} min` : "Preview"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          disabled={!movie.trailer}
          onClick={() => onTrailerClick(movie)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
          style={{
            backgroundColor: "var(--accent)",
            boxShadow: "var(--shadow-accent)",
          }}
        >
          <Play size={15} />
          Trailer
        </button>

        <Link
          href={`/movie/${movie.id}`}
          className="rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          Details
        </Link>
      </div>
    </article>
  );
}
