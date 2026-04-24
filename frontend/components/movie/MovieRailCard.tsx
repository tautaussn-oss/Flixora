import Link from "next/link";
import type { Movie } from "./types";

type MovieRailCardProps = {
  movie: Movie;
  onTrailerClick: (movie: Movie) => void;
};

export default function MovieRailCard({ movie, onTrailerClick }: MovieRailCardProps) {
  return (
    <article
      className="home-card-glow home-stagger-item relative min-w-[320px] max-w-[320px] overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
    >
      <div
        className="h-52 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{movie.title}</h3>

        <p className="line-clamp-2 text-sm" style={{ color: "var(--muted)" }}>
          {movie.description}
        </p>

        <p className="text-xs" style={{ color: "var(--muted)" }}>
          {movie.year || "N/A"} • {movie.duration ? `${movie.duration} min` : "N/A"} • {movie.genres[0] || "General"}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={!movie.trailer}
            onClick={() => onTrailerClick(movie)}
            className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50"
            style={{ backgroundColor: "var(--accent)", boxShadow: "var(--shadow-accent)" }}
          >
            Trailer
          </button>

          <Link
            href={`/movie/${movie.id}`}
            className="rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
            style={{ borderColor: "var(--border)" }}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
