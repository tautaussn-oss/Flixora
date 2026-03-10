import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovies } from "../services/service";
import { useFavorites } from "../hooks/favorites";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovie = async () => {
      const moviesData = await getMovies();
      const foundMovie = moviesData.find((m) => m.id === parseInt(id));
      setMovie(foundMovie);
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  const getRandomImage = (id) =>
    `https://picsum.photos/seed/${id}/400/600`;

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!movie) return <p className="text-center mt-6">Movie not found</p>;

  const isFavorite = favorites.some((m) => m.id === movie.id);

  return (
    <div className="mt-6 max-w-4xl mx-auto px-6">

      <Link to="/" className="text-blue-500 mb-4 inline-block hover:underline">
        ← Back to Home
      </Link>

      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/40">

        <h1 className="text-3xl font-bold text-blue-500 mb-4">
          {movie.title}
        </h1>

        <img
          src={getRandomImage(movie.id)}
          alt={movie.title}
          className="w-full h-96 object-cover rounded-2xl mb-4"
        />

        <p className="text-gray-700 mb-2">
          <strong>Year:</strong> {movie.year}
        </p>

        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {movie.description}
        </p>

        {/* Add to Favorites */}
        <button
          onClick={() => toggleFavorite(movie)}
          className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition"
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>

        {/* Trailer placeholder */}
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
          <p className="text-gray-500">Trailer will be here</p>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;