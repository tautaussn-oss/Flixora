"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import FeaturedMoviesSection from "./FeaturedMoviesSection";
import HomeHero from "./HomeHero";
import type { HomeMovie } from "./home-types";
import TrailerModal from "./TrailerModal";
import { getMovies, resolveMediaImage, resolveTrailerUrl, type ApiMovie } from "@/src/lib/api";

function toHomeMovie(movie: ApiMovie): HomeMovie {
  return {
    id: movie.id,
    title: movie.title,
    description:
      movie.description?.trim() ||
      "Discover this title through its official trailer and release details.",
    year: movie.year ?? 0,
    duration: movie.duration ?? null,
    genre: movie.genres?.[0]?.name ?? "General",
    posterUrl: resolveMediaImage(movie.poster ?? ""),
    trailerUrl: resolveTrailerUrl(movie.trailer ?? ""),
    featured: Boolean(movie.featured),
  };
}

function sortForFeatured(a: HomeMovie, b: HomeMovie) {
  if (a.featured !== b.featured) {
    return Number(b.featured) - Number(a.featured);
  }

  if (a.year !== b.year) {
    return b.year - a.year;
  }

  return a.title.localeCompare(b.title);
}

export default function HomePageClient() {
  const [movies, setMovies] = useState<HomeMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [trailerModal, setTrailerModal] = useState<{ open: boolean; url: string; title: string }>({
    open: false,
    url: "",
    title: "",
  });

  const openTrailer = useCallback((movie: HomeMovie) => {
    if (!movie.trailerUrl) return;

    setTrailerModal({
      open: true,
      url: movie.trailerUrl,
      title: movie.title,
    });
  }, []);

  const closeTrailer = useCallback(() => {
    setTrailerModal({ open: false, url: "", title: "" });
  }, []);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMovies();
      const normalized = response.map(toHomeMovie).sort(sortForFeatured);
      setMovies(normalized);
      setHeroIndex(0);
    } catch (err) {
      console.error("Homepage movie fetch failed", err);
      setError("Could not load featured movies right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (movies.length <= 1 || trailerModal.open) return;

    const interval = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % Math.min(movies.length, 6));
    }, 6500);

    return () => {
      window.clearInterval(interval);
    };
  }, [movies, trailerModal.open]);

  const heroMovies = useMemo(() => movies.slice(0, 6), [movies]);
  const safeHeroIndex = Math.min(heroIndex, Math.max(heroMovies.length - 1, 0));

  const goPrev = () => {
    if (heroMovies.length === 0) return;
    setHeroIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
  };

  const goNext = () => {
    if (heroMovies.length === 0) return;
    setHeroIndex((prev) => (prev + 1) % heroMovies.length);
  };

  return (
    <>
      <div className="relative overflow-hidden px-6 pb-24 pt-28 md:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 32%)",
          }}
        />

        <div className="relative space-y-14">
          <HomeHero
            movies={heroMovies}
            activeIndex={safeHeroIndex}
            onPrev={goPrev}
            onNext={goNext}
            onSelect={(index) => setHeroIndex(index)}
            onWatch={openTrailer}
          />

          <FeaturedMoviesSection
            movies={movies}
            loading={loading}
            error={error}
            onRetry={fetchMovies}
            onWatch={openTrailer}
          />
        </div>
      </div>

      <TrailerModal
        open={trailerModal.open}
        trailerUrl={trailerModal.url}
        title={trailerModal.title}
        onClose={closeTrailer}
      />
    </>
  );
}
