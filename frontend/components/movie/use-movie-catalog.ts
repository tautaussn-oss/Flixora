"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getActors, getGenres, getMovies, type ApiActor, type ApiGenre } from "@/src/lib/api";
import { mapMovie } from "./movie-mappers";
import type { Movie } from "./types";

export function useMovieCatalog() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<ApiGenre[]>([]);
  const [actors, setActors] = useState<ApiActor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [actor, setActor] = useState("all");

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [movieData, genreData, actorData] = await Promise.all([
        getMovies(),
        getGenres(),
        getActors(),
      ]);

      setMovies(movieData.map(mapMovie));
      setGenres(genreData);
      setActors(actorData);
    } catch (err) {
      console.error("Movies page fetch failed", err);
      setError("Could not load movies right now. Please retry in a few seconds.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const filteredMovies = useMemo(() => {
    const term = search.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesSearch =
        term === "" ||
        movie.title.toLowerCase().includes(term) ||
        movie.description.toLowerCase().includes(term);

      const matchesGenre = genre === "all" || movie.genres.includes(genre);
      const matchesActor = actor === "all" || movie.actors.includes(actor);

      return matchesSearch && matchesGenre && matchesActor;
    });
  }, [movies, search, genre, actor]);

  const hasActiveFilters = search !== "" || genre !== "all" || actor !== "all";

  const resetFilters = () => {
    setSearch("");
    setGenre("all");
    setActor("all");
  };

  return {
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
  };
}
