import { Navbar } from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Genre from "./routes/Genre";
import Favorite from "./routes/favorites"; 
import TvShow from "./routes/TvShow";
import MovieDetails from "./routes/MovieDetails"; 

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">

      {/* Navbar */}
      <Navbar className="fixed top-0 left-0 w-full z-50 shadow-md backdrop-blur-md bg-white/70" />

      {/* Glavni sadržaj */}
      <main className="pt-24 max-w-7xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Genre" element={<Genre />} />
          <Route path="/favorites" element={<Favorite />} /> 
          <Route path="/TvShow" element={<TvShow />} />
          <Route path="/movie/:id" element={<MovieDetails />} /> 
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-600">
        © {currentYear} Flixora. All rights reserved.
      </footer>
    </div>
  );
}

export default App;