alias Flixora.Repo
alias Flixora.Movies.Movie

trailers = %{
  # Inception
  1 => "https://www.youtube.com/embed/YoHD9XEInc0",
  # Interstellar
  2 => "https://www.youtube.com/embed/zSWdZVtXT7E",
  # Matrix
  3 => "https://www.youtube.com/embed/vKQi3bBA1y8",
  # Dark Knight
  4 => "https://www.youtube.com/embed/EXeTwQWrcwY",
  # Gladiator
  5 => "https://www.youtube.com/embed/P5ieIbInFpg",
  # Titanic
  6 => "https://www.youtube.com/embed/kVrqfYjkTdQ",
  # Avengers Endgame
  7 => "https://www.youtube.com/embed/TcMBFSGVi1c",
  # Parasite
  8 => "https://www.youtube.com/embed/5xH0HfJHsaY",
  # Joker
  9 => "https://www.youtube.com/embed/zAGVQLHvwOY",
  # Forrest Gump
  10 => "https://www.youtube.com/embed/bLvqoHBptjg",
  # Shawshank
  11 => "https://www.youtube.com/embed/PLl99DlL6b4",
  # Pulp Fiction
  12 => "https://www.youtube.com/embed/s7EdQ4FqbhY",
  # Fight Club
  13 => "https://www.youtube.com/embed/qtRKdVHc-cE",
  # LOTR 1
  14 => "https://www.youtube.com/embed/V75dMMIW2B4",
  # LOTR 2
  15 => "https://www.youtube.com/embed/LbfMDwc4azU",
  # LOTR 3
  16 => "https://www.youtube.com/embed/r5X-hFf6Bwo",
  # Django
  17 => "https://www.youtube.com/embed/0fUCuvNlOCg",
  # Wolf of Wall Street
  18 => "https://www.youtube.com/embed/iszwuX1AK6A",
  # Whiplash
  19 => "https://www.youtube.com/embed/7d_jQycdQGo",
  # Top Gun Maverick
  20 => "https://www.youtube.com/embed/qSqVVswa420"
}

Enum.each(trailers, fn {id, trailer} ->
  movie = Repo.get(Movie, id)

  if movie do
    movie
    |> Movie.changeset(%{trailer_embed: trailer})
    |> Repo.update!()
  end
end)
