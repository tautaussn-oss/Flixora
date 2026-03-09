defmodule FlixoraWeb.MovieController do
  use FlixoraWeb, :controller

  alias Flixora.Repo
  alias Flixora.Movies.Movie

  def index(conn, _params) do
    movies = Repo.all(Movie)
    json(conn, movies)
  end
end
