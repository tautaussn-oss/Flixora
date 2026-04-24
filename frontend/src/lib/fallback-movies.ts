import type { ApiMovie } from "./api";

function makeMovie(
  id: number,
  title: string,
  year: number,
  duration: number,
  genre: string,
  actor: string,
  featured = false,
  kids = false,
): ApiMovie {
  return {
    id,
    title,
    description: `${title} is available as part of Flixora fallback catalog while upstream API is recovering.`,
    year,
    duration,
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    featured,
    kids,
    director: "Flixora Studio",
    publisher: "Flixora",
    season: null,
    genres: [{ id: id + 1000, name: genre }],
    actors: [{ id: id + 2000, name: actor }],
  };
}

export const FALLBACK_MOVIES: ApiMovie[] = [
  makeMovie(10001, "Interstellar", 2014, 169, "Sci-Fi", "Matthew McConaughey", true),
  makeMovie(10002, "The Batman", 2022, 176, "Action", "Robert Pattinson", true),
  makeMovie(10003, "Dune: Part Two", 2024, 166, "Adventure", "Timothee Chalamet", true),
  makeMovie(10004, "Spider-Verse", 2018, 117, "Animation", "Shameik Moore", false, true),
  makeMovie(10005, "Top Gun: Maverick", 2022, 131, "Drama", "Tom Cruise", false, true),
  makeMovie(10006, "Oppenheimer", 2023, 180, "Biography", "Cillian Murphy", true),
  makeMovie(10007, "Tenet", 2020, 150, "Sci-Fi", "John David Washington", false),
  makeMovie(10008, "The Dark Knight", 2008, 152, "Crime", "Christian Bale", true),
  makeMovie(10009, "Inception", 2010, 148, "Thriller", "Leonardo DiCaprio", true),
  makeMovie(10010, "Blade Runner 2049", 2017, 164, "Sci-Fi", "Ryan Gosling"),
  makeMovie(10011, "The Matrix", 1999, 136, "Sci-Fi", "Keanu Reeves", true),
  makeMovie(10012, "Guardians of the Galaxy", 2014, 121, "Comedy", "Chris Pratt", false, true),
  makeMovie(10013, "Mad Max: Fury Road", 2015, 120, "Action", "Tom Hardy"),
  makeMovie(10014, "Arrival", 2016, 116, "Drama", "Amy Adams"),
  makeMovie(10015, "The Lord of the Rings", 2001, 178, "Fantasy", "Elijah Wood", true),
  makeMovie(10016, "Avatar", 2009, 162, "Adventure", "Sam Worthington", false, true),
];
