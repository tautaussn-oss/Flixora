import React from "react";
import { RiMovieAiLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-blue-300/70 border-b border-gray-200 z-50">

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4 gap-4">

        
        <Link to="/" className="flex items-center gap-3 text-blue-500 font-bold text-xl">
          <RiMovieAiLine className="text-4xl" />
          Flixora
        </Link>

        {/* Menu Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">

          <Link className="hover:text-blue-500 transition" to="/">Home</Link>
          <Link className="hover:text-blue-500 transition" to="/movies">Movies</Link>
          <Link className="hover:text-blue-500 transition" to="/Genre">Genre</Link>
          <Link className="hover:text-blue-500 transition" to="/TvShow">TvShow</Link>

        </div>

        {/* Search + Button */}
        <div className="flex items-center gap-4 w-full md:w-auto">

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Sign In Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition">
            Sign In
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;