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

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!movie) return <p className="text-center mt-6">Movie not found</p>;

  const isFavorite = favorites.some((m) => m.id === movie.id);

  return (
    <div className="mt-6 max-w-5xl mx-auto px-4 md:px-6">
      <Link to="/" className="text-blue-500 mb-6 inline-block hover:underline">
        ← Back to Home
      </Link>

      <div className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-lg border border-white/40 flex flex-col gap-6">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-blue-500">{movie.title}</h1>

        {/* Movie Image */}
        <div className="w-full overflow-hidden rounded-2xl shadow-lg">
          <img
            src={`http://localhost:4000/images/${movie.image_path}`}
            alt={movie.title}
            className="w-full h-auto max-h-150 object-cover mx-auto"
          />
        </div>

        
        <p className="text-gray-700 text-lg"><strong>Year:</strong> {movie.year}</p>
        <p className="text-gray-700 text-base"><strong>Description:</strong> {movie.description}</p>

        
        <button
          onClick={() => toggleFavorite(movie)}
          className="self-start bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition"
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>

        {/* Trailer */}
        <div className="w-full aspect-video md:h-125 rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={movie.trailer_embed}
            title={movie.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;