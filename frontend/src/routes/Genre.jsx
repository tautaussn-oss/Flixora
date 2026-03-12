import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/service";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("http://localhost:4000/api/genres");
      const data = await res.json();

      // API vraća { data: [...] }
      setGenres(data.data);
    };

    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
    };

    fetchGenres();
    fetchMovies();
  }, []);

  // filtrirani filmovi
  const filteredMovies = selectedGenre
    ? movies.filter((movie) => movie.genre_id === Number(selectedGenre))
    : movies;

  return (
    <div className="mt-6 grid gap-6 px-6">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/40 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-blue-500 mb-2">
            Browse by Genre
          </h1>

          <p className="text-gray-600">
            Select a genre to explore movies.
          </p>
        </div>

        {/* Dropdown */}
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-300 outline-none"
        >
          <option value="">All Genres</option>

          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genre}
            </option>
          ))}
        </select>
      </div>

      {/* Movies grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>

            <div className="relative overflow-hidden rounded-3xl shadow-lg border border-white/40 transform transition duration-300 hover:scale-105">

              {/* Poster */}
              <img
                src={`http://localhost:4000/images/${movie.image_path}`}
                alt={movie.title}
                className="w-full h-96 object-cover"
              />

              {/* Info */}
              <div className="p-4 bg-white flex flex-col gap-2">

                <h2 className="text-lg font-bold text-blue-500">
                  {movie.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {movie.year}
                </p>

              </div>

            </div>

          </Link>
        ))}

      </div>

      {/* Ako nema filmova */}
      {filteredMovies.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No movies found for this genre.
        </p>
      )}

    </div>
  );
};

export default Genre;