const API_BASE_URL = "https://flixora-jjjq.onrender.com";

export async function getMovies() {
  const res = await fetch(`${API_BASE_URL}/api/movies`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch movies: ${res.status}`);
  }

  const data = await res.json();
  return data.movies ?? [];
}

export async function getShows() {
  const res = await fetch(`${API_BASE_URL}/api/shows`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch shows: ${res.status}`);
  }

  const data = await res.json();
  return data.shows ?? [];
}

export async function getGenres() {
  const res = await fetch(`${API_BASE_URL}/api/genres`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch genres: ${res.status}`);
  }

  const data = await res.json();
  return data.genres ?? [];
}

export function resolveMediaImage(poster: string) {
  if (!poster) return "/fallback-poster.jpg";

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

export function mapMovieToCard(movie: any) {
  return {
    id: movie.id,
    title: movie.title,
    year: String(movie.year),
    genre: movie.genres?.[0]?.name ?? "Unknown",
    rating: "8.0",
    image: resolveMediaImage(movie.poster),
  };
}

export function mapShowToCard(show: any) {
  return {
    id: `show-${show.id}`,
    title: show.title,
    year: String(show.year),
    genre: show.genres?.[0]?.name ?? "Unknown",
    rating: "8.0",
    image: resolveMediaImage(show.poster),
  };
}

export function mapContentToHeroItem(item: any, kind: "movie" | "show") {
  return {
    id: item.id,
    title: item.title,
    description:
      item.description ||
      "Discover featured trailers, explore upcoming releases, and enjoy a more cinematic browsing experience.",
    year: String(item.year),
    genre: item.genres?.[0]?.name ?? "Unknown",
    rating: "8.0",
    duration: item.duration ? `${item.duration} min` : "HD Preview",
    image: resolveMediaImage(item.poster),
    trailer: resolveTrailerUrl(item.trailer),
    kind,
  };
}

export function mapGenreToCategory(genre: any, index: number) {
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