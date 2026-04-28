import type { CatalogMovie } from "@/src/lib/movie-catalog";

export type Movie = CatalogMovie;

export type FiltersState = {
  search: string;
  genre: string;
  actor: string;
  year: string;
};
