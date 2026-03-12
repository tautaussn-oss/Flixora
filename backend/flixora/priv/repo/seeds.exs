alias Flixora.Repo
alias Flixora.Movies.Genre

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
  Repo.insert!(%Genre{
    genre: genre
  })
end)
