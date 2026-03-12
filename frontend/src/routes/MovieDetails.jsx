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

  if (loading)
    return <p className="text-center mt-6 text-gray-400">Loading...</p>;

  if (!movie)
    return <p className="text-center mt-6 text-gray-400">Movie not found</p>;

  const isFavorite = favorites.some((m) => m.id === movie.id);

  const handleFavorite = () => {
    toggleFavorite(movie);

    // refresh da se dugme odmah promijeni
    window.location.reload();
  };

  return (
    <div className="mt-8 max-w-5xl mx-auto px-4 md:px-6">

      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-white border border-gray-600 rounded-full hover:bg-blue-500 transition"
      >
        ← Back to Home
      </Link>

      <div className="bg-gray-900/70 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-800 flex flex-col gap-8">

        
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
          {movie.title}
        </h1>

       
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          <iframe
            className="w-full h-full"
            src={movie.trailer_embed}
            title={movie.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>

        
        <div className="flex flex-col md:flex-row gap-6 items-start">

          
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-xl">
            <img
              src={`http://localhost:4000/images/${movie.image_path}`}
              alt={movie.title}
              className="w-full object-cover"
            />
          </div>

          
          <div className="flex flex-col gap-4 md:w-2/3">

            <p className="text-gray-300 text-lg">
              <strong className="text-blue-400">Year:</strong> {movie.year}
            </p>

            <p className="text-gray-400 leading-relaxed">
              <strong className="text-blue-400">Description:</strong>{" "}
              {movie.description}
            </p>

            
            <button
              onClick={handleFavorite}
              className="w-fit bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white px-6 py-2 rounded-full shadow-lg transition"
            >
              {isFavorite
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MovieDetails;