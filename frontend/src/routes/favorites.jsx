import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((m) => m.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  // search filter
  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-6 grid gap-6 px-6">

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/40 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-blue-500">
            Favorite Movies ({favorites.length})
          </h1>
          <p className="text-gray-600">Your favorite movies collection.</p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search favorites..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-300 outline-none"
        />

        {/* Clear all */}
        {favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Empty state */}
      {favorites.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-100">
            ⭐ No favorite movies yet
          </h2>
          <p className="text-gray-500">
            Start exploring movies and add them to your favorites.
          </p>

          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredFavorites.map((movie) => (
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

                <h2 className="text-lg font-bold text-blue-500">
                  {movie.title}
                </h2>

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