defmodule FlixoraWeb.Api.MovieController do
  use FlixoraWeb, :controller

  alias Flixora.Repo
  alias Flixora.Movies.Movie

  def index(conn, _params) do
    movies = Repo.all(Movie)
    render(conn, :index, movies: movies)
  end
end
