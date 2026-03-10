import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/service";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const getRandomImage = (id) =>
    `https://picsum.photos/seed/${id}/400/600`;

  return (
    <div className="mt-6 grid gap-6 px-6">

      <div className="bg-white/80 backdrop-blur-md p-12 rounded-3xl shadow-lg border border-white/40
                      flex flex-col items-center justify-center text-center
                      transform transition duration-300 hover:scale-105 hover:shadow-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-500 mb-3">Home Page</h1>
        <p className="text-gray-600">
          Welcome to Flixora streaming platform.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-700 text-center mt-4">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="relative overflow-hidden rounded-3xl shadow-lg border border-white/40
                              transform transition duration-300 hover:scale-105 cursor-pointer">

                <img
                  src={getRandomImage(movie.id)}
                  alt={movie.title}
                  className="w-full h-96 object-cover"
                />

                <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100
                                flex flex-col justify-center items-center text-center
                                text-white p-4 transition-opacity duration-300">
                  <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-sm">{movie.description}</p>
                  <p className="mt-1 text-gray-200 text-xs">{movie.year}</p>
                </div>

              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
};

export default Home;