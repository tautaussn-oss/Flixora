defmodule FlixoraWeb.Api.MovieController do
  use FlixoraWeb, :controller

  alias Flixora.Movies

  def index(conn, params) do
    movies = Movies.list_movies(params)
    render(conn, :index, movies: movies)
  end

  def show(conn, %{"id" => id}) do
    case Movies.get_movie(id) do
      {:ok, movie} ->
        render(conn, :show, movie: movie)

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Movie not found"})
    end
  end
end
