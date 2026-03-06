import { Navbar } from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Genre from "./routes/Genre";
import Movies from "./routes/movies";
import TvShow from "./routes/TvShow";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900 pt-24">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Genre" element={<Genre />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/TvShow" element={<TvShow />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;