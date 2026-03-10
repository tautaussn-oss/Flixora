alias Flixora.Repo
alias Flixora.Movies.Movie

images = %{
  1 => "inception.jpg",
  2 => "interstellar.jpg",
  3 => "matrix.jpg",
  4 => "dark_knight.jpg",
  5 => "gladiator.jpg",
  6 => "titanic.jpg",
  7 => "avengers.jpg",
  8 => "parasite.jpg",
  9 => "joker.jpg",
  10 => "forrest_gump.jpg",
  11 => "shawshank.jpg",
  12 => "pulp_fiction.jpg",
  13 => "fight_club.jpg",
  14 => "lotr1.jpg",
  15 => "lotr2.jpg",
  16 => "lotr3.jpg",
  17 => "django.jpg",
  18 => "wolf_wall_street.jpg",
  19 => "whiplash.jpg",
  20 => "topgun.jpg"
}

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

Enum.each(images, fn {id, image} ->
  movie = Repo.get(Movie, id)

  if movie do
    movie
    |> Movie.changeset(%{image_path: image})
    |> Repo.update!()
  end
end)
