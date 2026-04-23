const API_BASE_URL = "https://flixora-jjjq.onrender.com";

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

export async function getMovies(): Promise<ApiMovie[]> {
  const res = await fetch(`${API_BASE_URL}/api/movies`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.status}`);
  }

  const data = (await res.json()) as { movies?: ApiMovie[] };
  return Array.isArray(data.movies) ? data.movies : [];
}

export async function getMovieById(id: string | number): Promise<ApiMovie> {
  const res = await fetch(`${API_BASE_URL}/api/movies/${id}`, {
    next: { revalidate: 180 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${id}: ${res.status}`);
  }

  const data = (await res.json()) as { movie?: ApiMovie };

  if (!data.movie) {
    throw new Error(`Movie ${id} is missing in API response`);
  }

  return data.movie;
}

export async function getShows(): Promise<ApiShow[]> {
  const res = await fetch(`${API_BASE_URL}/api/shows`, {
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch shows: ${res.status}`);
  }

  const data = (await res.json()) as { shows?: ApiShow[] };
  return Array.isArray(data.shows) ? data.shows : [];
}

export async function getGenres(): Promise<ApiGenre[]> {
  const res = await fetch(`${API_BASE_URL}/api/genres`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch genres: ${res.status}`);
  }

  const data = (await res.json()) as { genres?: ApiGenre[] };
  return Array.isArray(data.genres) ? data.genres : [];
}

export async function getActors(): Promise<ApiActor[]> {
  const res = await fetch(`${API_BASE_URL}/api/actors`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch actors: ${res.status}`);
  }

  const data = (await res.json()) as { actors?: ApiActor[] };
  return Array.isArray(data.actors) ? data.actors : [];
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
