export const useFavorites = () => {

  const getFavorites = () => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  };

  const toggleFavorite = (movie) => {
    const favorites = getFavorites();

    const exists = favorites.some((m) => m.id === movie.id);

    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter((m) => m.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return {
    favorites: getFavorites(),
    toggleFavorite,
  };
};