import { Navbar } from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Genre from "./routes/Genre";
import Favorite from "./routes/favorites"; 
import TvShow from "./routes/TvShow";
import MovieDetails from "./routes/MovieDetails"; 
import Footer from "./components/footer";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-750 via-gray-900 to-gray-800 text-gray-200">

      {/* Navbar */}
      <Navbar />

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

      <Footer />
    </div>
  );
}

export default App;