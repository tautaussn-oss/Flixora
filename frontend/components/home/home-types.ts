export type HomeMovie = {
  id: number;
  title: string;
  description: string;
  year: number;
  duration: number | null;
  genre: string;
  posterUrl: string;
  trailerUrl: string;
  featured: boolean;
};
