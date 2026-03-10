import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // uklanjanje filma
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((m) => m.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="mt-6 grid gap-6 px-6">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/40">
        <h1 className="text-3xl font-bold text-blue-500 mb-3">Favorite Movies</h1>
        <p className="text-gray-600 mb-4">Your favorite movies collection.</p>
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-700">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="relative overflow-hidden rounded-3xl shadow-lg border border-white/40 transform transition duration-300 hover:scale-105"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`http://localhost:4000/images/${movie.image_path}`}
                  alt={movie.title}
                  className="w-full h-96 object-cover rounded-t-2xl"
                />
              </Link>

              <div className="p-4 bg-white rounded-b-2xl flex flex-col gap-2">
                <h2 className="text-lg font-bold text-blue-500">{movie.title}</h2>
                <p className="text-gray-600 text-sm">{movie.year}</p>

                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;