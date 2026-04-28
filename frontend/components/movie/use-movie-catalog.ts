"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getMovieCatalog, type CatalogActor, type MovieCatalog } from "@/src/lib/movie-catalog";
import type { Movie } from "./types";

type CatalogState = {
  loading: boolean;
  error: string | null;
  movies: Movie[];
  genres: string[];
  actors: CatalogActor[];
  years: number[];
  trendingMovies: Movie[];
  actorHighlights: MovieCatalog["actorGroups"];
};

const initialState: CatalogState = {
  loading: true,
  error: null,
  movies: [],
  genres: [],
  actors: [],
  years: [],
  trendingMovies: [],
  actorHighlights: [],
};

export function useMovieCatalog() {
  const [catalog, setCatalog] = useState<CatalogState>(initialState);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [actor, setActor] = useState("all");
  const [year, setYear] = useState("all");

  const reload = useCallback(async (forceRefresh = false) => {
    setCatalog((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await getMovieCatalog(forceRefresh);

      setCatalog({
        loading: false,
        error: null,
        movies: data.movies,
        genres: data.genres,
        actors: data.actors,
        years: data.years,
        trendingMovies: data.trendingMovies,
        actorHighlights: data.actorGroups,
      });
    } catch (err) {
      console.error("Movies page fetch failed", err);
      setCatalog((prev) => ({
        ...prev,
        loading: false,
        error: "Could not load movies right now. Please retry in a few seconds.",
      }));
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void reload();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [reload]);

  const filteredMovies = useMemo(() => {
    const term = search.trim().toLowerCase();

    return catalog.movies.filter((movie) => {
      const matchesSearch =
        term === "" ||
        movie.title.toLowerCase().includes(term) ||
        movie.description.toLowerCase().includes(term);

      const matchesGenre = genre === "all" || movie.genres.includes(genre);
      const matchesActor = actor === "all" || movie.actors.includes(actor);
      const matchesYear = year === "all" || String(movie.year) === year;

      return matchesSearch && matchesGenre && matchesActor && matchesYear;
    });
  }, [catalog.movies, search, genre, actor, year]);

  const hasActiveFilters = search !== "" || genre !== "all" || actor !== "all" || year !== "all";

  const resetFilters = () => {
    setSearch("");
    setGenre("all");
    setActor("all");
    setYear("all");
  };

  return {
    ...catalog,
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
    reload: () => reload(true),
  };
}
