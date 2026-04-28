import { resolveMediaImage, resolveTrailerUrl, type ApiMovie } from "@/src/lib/api";
import type { Movie } from "./types";

export function mapMovie(movie: ApiMovie): Movie {
  const genres = movie.genres?.map((genre) => genre.name) || [];
  const actors = movie.actors?.map((actor) => actor.name) || [];
  const featured = Boolean(movie.featured);
  const spotlightScore =
    (featured ? 30 : 0) +
    Math.max(0, (movie.year || 0) - 2000) +
    Math.min(actors.length * 3, 12) +
    Math.min(genres.length * 2, 6);

  return {
    id: movie.id,
    title: movie.title,
    description: movie.description || "No description available.",
    year: movie.year || 0,
    duration: movie.duration || 0,
    genres,
    actors,
    poster: resolveMediaImage(movie.poster || ""),
    trailer: resolveTrailerUrl(movie.trailer || ""),
    featured,
    spotlightScore,
  };
}
