"use client";

import { useState } from "react";
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
    filteredMovies,
    hasActiveFilters,
    search,
    genre,
    actor,
    setSearch,
    setGenre,
    setActor,
    resetFilters,
    reload,
  } = useMovieCatalog();

  const [trailer, setTrailer] = useState({ open: false, url: "", title: "" });

  const openTrailer = (movie: Movie) => {
    if (!movie.trailer) return;
    setTrailer({ open: true, url: movie.trailer, title: movie.title });
  };

  return (
    <>
      <main className="px-6 pb-24 pt-28 md:px-10 lg:px-16">
        <section className="mx-auto max-w-7xl">
          <MoviesHeader />

          <MoviesFilters
            search={search}
            genre={genre}
            actor={actor}
            genres={genres}
            actors={actors}
            onSearchChange={setSearch}
            onGenreChange={setGenre}
            onActorChange={setActor}
            onReset={resetFilters}
          />

          {!loading && !error ? (
            <p className="mt-5 text-sm" style={{ color: "var(--muted)" }}>
              {filteredMovies.length} of {movies.length} movies
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
