export type Movie = {
  id: number;
  title: string;
  description: string;
  year: number;
  duration: number;
  genres: string[];
  actors: string[];
  poster: string;
  trailer: string;
};

export type FiltersState = {
  search: string;
  genre: string;
  actor: string;
};
