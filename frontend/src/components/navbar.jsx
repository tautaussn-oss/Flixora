import React, { useState, useEffect } from "react";
import { RiMovieAiLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { getMovies } from "../services/service"; 

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await getMovies();
      setMovies(moviesData);
    };
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    const foundMovie = movies.find((m) =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundMovie) {
      navigate(`/movie/${foundMovie.id}`);
      setSearchTerm("");
    } else {
      alert("Movie not found");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-xl bg-gray-950/70 border-b border-gray-800 z-50">
      
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4 gap-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-blue-500 font-bold text-xl hover:scale-105 transition"
        >
          <RiMovieAiLine className="text-4xl" />
          Flixora
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-blue-400 font-medium">

          <Link className="relative group" to="/">
            Home
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link className="relative group" to="/favorites">
            Favorites
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link className="relative group" to="/Genre">
            Genre
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link className="relative group" to="/TvShow">
            TvShow
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
          </Link>

        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-4 w-full md:w-auto">

          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white px-6 py-2 rounded-full shadow-lg transition"
          >
            Search
          </button>

        </form>

      </div>
    </nav>
  );
};

export default Navbar;