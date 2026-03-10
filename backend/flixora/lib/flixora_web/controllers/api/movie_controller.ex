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
    render(conn, :show, movie: movie)
  end

  def create(conn, params) do
    case Movies.create_movie(params) do
      {:ok, movie} -> render(conn, :show, movie: movie)
      {:error, changeset} -> json(conn, %{error: "could not create movie"})
    end
  end

  def delete(conn, %{"id" => id}) do
    {:ok, _movie} = Movies.delete_movie(id)
    send_resp(conn, :no_content, "")
  end

  def update(conn, %{"id" => id} = params) do
    movie = Movies.get_movie!(id)

    case Movies.update_movie(movie, params) do
      {:ok, _movie} -> render(conn, :show, movie: movie)
      {:error, changeset} -> json(conn, %{error: "could not update  movie"})
    end
  end
end
