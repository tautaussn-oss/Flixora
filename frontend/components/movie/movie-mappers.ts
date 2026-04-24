import { resolveMediaImage, resolveTrailerUrl, type ApiMovie } from "@/src/lib/api";
import type { Movie } from "./types";

export function mapMovie(movie: ApiMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.description || "No description available.",
    year: movie.year || 0,
    duration: movie.duration || 0,
    genres: movie.genres?.map((genre) => genre.name) || [],
    actors: movie.actors?.map((actor) => actor.name) || [],
    poster: resolveMediaImage(movie.poster || ""),
    trailer: resolveTrailerUrl(movie.trailer || ""),
  };
}
