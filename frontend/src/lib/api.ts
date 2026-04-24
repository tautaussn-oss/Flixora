const API_BASE_URL = "https://flixora-jjjq.onrender.com";
const INTERNAL_PROXY_BASE = "/api/flixora";

const isBrowser = () => typeof window !== "undefined";

function resolveApiUrl(path: string) {
  if (isBrowser()) {
    return `${INTERNAL_PROXY_BASE}${path.replace(/^\/api/, "")}`;
  }

  return `${API_BASE_URL}${path}`;
}

function withRevalidate(seconds: number): RequestInit {
  if (isBrowser()) {
    return {
      cache: "no-store",
      headers: { Accept: "application/json" },
    };
  }

  return {
    headers: { Accept: "application/json" },
    next: { revalidate: seconds },
  };
}

export type NamedEntity = {
  id: number;
  name: string;
};

export type ApiMovie = {
  id: number;
  title: string;
  description: string | null;
  year: number | null;
  duration: number | null;
  poster: string | null;
  trailer: string | null;
  featured: boolean | null;
  kids: boolean | null;
  director: string | null;
  publisher: string | null;
  season: number | null;
  genres: NamedEntity[];
  actors: NamedEntity[];
};

export type ApiShow = {
  id: number;
  title: string;
  description: string | null;
  year: number | null;
  season: number | null;
  trailer: string | null;
  featured: boolean | null;
  kids: boolean | null;
  poster: string | null;
  genres: NamedEntity[];
  actors: NamedEntity[];
};

export type ApiGenre = {
  id: number;
  name: string;
};

export type ApiActor = {
  id: number;
  name: string;
};

export type CardItem = {
  id: number | string;
  title: string;
  year: string;
  genre: string;
  rating: string;
  image: string;
};

export type HeroItem = {
  id: number;
  title: string;
  description: string;
  year: string;
  genre: string;
  rating: string;
  duration: string;
  image: string;
  trailer: string;
  kind: "movie" | "show";
};

export type CategoryItem = {
  id: number;
  title: string;
  image: string;
};

import { FALLBACK_MOVIES } from "./fallback-movies";

async function safeJson<T>(
  path: string,
  revalidateSeconds: number,
): Promise<{ ok: true; data: T } | { ok: false; status: number | null }> {
  try {
    const res = await fetch(resolveApiUrl(path), withRevalidate(revalidateSeconds));

    if (!res.ok) {
      return { ok: false, status: res.status };
    }

    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch {
    return { ok: false, status: null };
  }
}

export async function getMovies(): Promise<ApiMovie[]> {
  const firstTry = await safeJson<{ movies?: ApiMovie[] }>("/api/movies", 600);
  if (firstTry.ok && Array.isArray(firstTry.data.movies)) {
    return firstTry.data.movies;
  }

  const retry = await safeJson<{ movies?: ApiMovie[] }>("/api/movies", 30);
  if (retry.ok && Array.isArray(retry.data.movies)) {
    return retry.data.movies;
  }

  return FALLBACK_MOVIES;
}

export async function getMovieById(id: string | number): Promise<ApiMovie> {
  const result = await safeJson<{ movie?: ApiMovie }>(`/api/movies/${id}`, 180);
  if (result.ok && result.data.movie) {
    return result.data.movie;
  }

  const fallback = FALLBACK_MOVIES.find((movie) => String(movie.id) === String(id));
  if (fallback) {
    return fallback;
  }

  throw new Error(`Failed to fetch movie ${id}`);
}

export async function getShows(): Promise<ApiShow[]> {
  const result = await safeJson<{ shows?: ApiShow[] }>("/api/shows", 120);
  if (result.ok && Array.isArray(result.data.shows)) {
    return result.data.shows;
  }

  return [];
}

export async function getGenres(): Promise<ApiGenre[]> {
  const result = await safeJson<{ genres?: ApiGenre[] }>("/api/genres", 600);
  if (result.ok && Array.isArray(result.data.genres)) {
    return result.data.genres;
  }

  return [];
}

export async function getActors(): Promise<ApiActor[]> {
  const result = await safeJson<{ actors?: ApiActor[] }>("/api/actors", 600);
  if (result.ok && Array.isArray(result.data.actors)) {
    return result.data.actors;
  }

  return [];
}

export function resolveMediaImage(poster: string) {
  if (!poster) {
    return "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop";
  }

  if (poster.startsWith("http://") || poster.startsWith("https://")) {
    return poster;
  }

  return `${API_BASE_URL}/${poster}`;
}

export function resolveTrailerUrl(trailer: string) {
  if (!trailer) return "";

  if (trailer.startsWith("http://") || trailer.startsWith("https://")) {
    return trailer;
  }

  return `${API_BASE_URL}/${trailer}`;
}

export function mapMovieToCard(movie: ApiMovie): CardItem {
  return {
    id: movie.id,
    title: movie.title,
    year: String(movie.year ?? "N/A"),
    genre: movie.genres?.[0]?.name ?? "Unknown",
    rating: "8.0",
    image: resolveMediaImage(movie.poster ?? ""),
  };
}

export function mapShowToCard(show: ApiShow): CardItem {
  return {
    id: `show-${show.id}`,
    title: show.title,
    year: String(show.year ?? "N/A"),
    genre: show.genres?.[0]?.name ?? "Unknown",
    rating: "8.0",
    image: resolveMediaImage(show.poster ?? ""),
  };
}

export function mapContentToHeroItem(
  item: ApiMovie | ApiShow,
  kind: "movie" | "show",
): HeroItem {
  const movieDuration = "duration" in item ? item.duration : null;

  return {
    id: item.id,
    title: item.title,
    description:
      item.description ||
      "Discover featured trailers, explore upcoming releases, and enjoy a more cinematic browsing experience.",
    year: String(item.year ?? "N/A"),
    genre: item.genres?.[0]?.name ?? "Unknown",
    rating: "8.0",
    duration: movieDuration ? `${movieDuration} min` : "HD Preview",
    image: resolveMediaImage(item.poster ?? ""),
    trailer: resolveTrailerUrl(item.trailer ?? ""),
    kind,
  };
}

export function mapGenreToCategory(genre: ApiGenre, index: number): CategoryItem {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop",
  ];

  return {
    id: genre.id ?? index + 1,
    title: genre.name,
    image: fallbackImages[index % fallbackImages.length],
  };
}
