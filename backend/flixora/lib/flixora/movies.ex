defmodule Flixora.Movies do
  alias Flixora.Repo
  alias Flixora.Movies.Movie
  alias Flixora.Movies.Genre
  import Ecto.Query


  def list_all do
    Repo.all(Movie)
  end

  def get_movie!(id) do
    Repo.get!(Movie, id)
  end

  def create_movie(attrs) do
    %Movie{}
    |> Movie.changeset(attrs)
    |> Repo.insert()
  end

  def delete_movie(id) do
    movie = Repo.get!(Movie, id)
    Repo.delete(movie)
  end

  def update_movie(%Movie{} = movie, attrs) do
    movie
    |> Movie.changeset(attrs)
    |> Repo.update()
  end

  def search_movies(query) do
    from( m in Movie , where: ilike(m.title,^"%#{query}%"))
    |> Repo.all()
  end

  def list_genres do
    Repo.all(Genre)
  end
end
