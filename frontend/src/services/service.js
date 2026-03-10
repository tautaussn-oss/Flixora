// service.js
const BASE_URL = "http://localhost:4000/api";


export const getMovies = async () => {
  try {
    const res = await fetch(`${BASE_URL}/movies`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    // Backend vraća objekat sa poljem "movies" u json
    return data.movies || [];
  } catch (error) {
    console.error("API error:", error);
    return []; 
  }
};