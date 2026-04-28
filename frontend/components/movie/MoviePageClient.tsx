"use client";

import { useMemo, useState } from "react";
import TrailerModal from "@/components/home/TrailerModal";
import MoviesFilters from "./MoviesFilters";
import MoviesHeader from "./MoviesHeader";
import MoviesRail from "./MoviesRail";
import { MoviesEmptyState, MoviesErrorState, MoviesLoadingState } from "./MoviesState";
import type { Movie } from "./types";
import { useMovieCatalog } from "./use-movie-catalog";

export default function MoviePageClient() {
  const {
    loading,
    error,
    movies,
    genres,
    actors,
    years,
    filteredMovies,
    hasActiveFilters,
    search,
    genre,
    actor,
    year,
    setSearch,
    setGenre,
    setActor,
    setYear,
    resetFilters,
    reload,
  } = useMovieCatalog();

  const [trailer, setTrailer] = useState({ open: false, url: "", title: "" });

  const openTrailer = (movie: Movie) => {
    if (!movie.trailer) return;
    setTrailer({ open: true, url: movie.trailer, title: movie.title });
  };

  const summaryText = useMemo(() => {
    if (loading || error) return "";

    return `${filteredMovies.length} of ${movies.length} movies visible`;
  }, [error, filteredMovies.length, loading, movies.length]);

  return (
    <>
      <main className="relative overflow-hidden px-6 pb-24 pt-28 md:px-10 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 26%), linear-gradient(180deg, color-mix(in srgb, var(--bg-soft) 65%, transparent) 0%, transparent 50%)",
          }}
        />

        <section className="relative mx-auto max-w-7xl">
          <MoviesHeader totalMovies={movies.length} totalActors={actors.length} />

          <MoviesFilters
            search={search}
            genre={genre}
            actor={actor}
            year={year}
            genres={genres}
            actors={actors}
            years={years}
            onSearchChange={setSearch}
            onGenreChange={setGenre}
            onActorChange={setActor}
            onYearChange={setYear}
            onReset={resetFilters}
          />

          {!loading && !error ? (
            <p className="mt-5 text-sm" style={{ color: "var(--muted)" }}>
              {summaryText}
            </p>
          ) : null}

          {loading ? <MoviesLoadingState /> : null}
          {!loading && error ? <MoviesErrorState message={error} onRetry={reload} /> : null}
          {!loading && !error && filteredMovies.length === 0 ? (
            <MoviesEmptyState hasFilters={hasActiveFilters} />
          ) : null}
          {!loading && !error && filteredMovies.length > 0 ? (
            <MoviesRail movies={filteredMovies} onTrailerClick={openTrailer} />
          ) : null}
        </section>
      </main>

      <TrailerModal
        open={trailer.open}
        trailerUrl={trailer.url}
        title={trailer.title}
        onClose={() => setTrailer({ open: false, url: "", title: "" })}
      />
    </>
  );
}
