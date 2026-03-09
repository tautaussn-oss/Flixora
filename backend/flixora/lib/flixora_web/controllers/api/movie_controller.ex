defmodule FlixoraWeb.Api.MovieController do
  use FlixoraWeb, :controller

  alias Flixora.Repo
  alias Flixora.Movies.Movie
  alias Flixora.Movies

  def index(conn, _params) do
    movies = Movies.list_all()
    render(conn, :index, movies: movies)
  end
  def show(conn, %{"id" => id}) do

      movie = Movies.get_movie!(id)
      render(conn, :show, movie: movie )

  end
end
