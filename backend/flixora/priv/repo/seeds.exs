alias Flixora.Repo
alias Flixora.Movies.{Genre, Movie}
import Ecto.Query

# --- GENRES ---

genres = [
  "Action",
  "Drama",
  "Comedy",
  "Sci-Fi",
  "Horror",
  "Thriller",
  "Adventure",
  "Fantasy",
  "Crime",
  "Romance"
]

Enum.each(genres, fn genre ->
  Repo.insert!(
    %Genre{genre: genre},
    on_conflict: :nothing  # da ne pravi duplikate ako već postoje
  )
end)

# --- RATINGS ---

ratings = [
  {1, 8.9},
  {2, 7.5},
  {3, 9.1},
  {4, 6.8},
  {5, 7.9},
  {6, 8.2},
  {7, 7.3},
  {8, 8.6},
  {9, 6.9},
  {10, 7.8},
  {11, 8.4},
  {12, 7.1},
  {13, 8.7},
  {14, 7.6},
  {15, 8.0},
  {16, 6.7},
  {17, 8.3},
  {18, 7.4},
  {19, 8.5},
  {20, 7.2}
]

Enum.each(ratings, fn {id, rating} ->
  Repo.update_all(
    from(m in Movie, where: m.id == ^id),
    set: [rating: rating]
  )
end)
