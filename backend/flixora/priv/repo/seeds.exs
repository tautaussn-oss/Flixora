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

Enum.each(images, fn {id, image} ->
  movie = Repo.get(Movie, id)

  if movie do
    movie
    |> Movie.changeset(%{image_path: image})
    |> Repo.update!()
  end
end)
