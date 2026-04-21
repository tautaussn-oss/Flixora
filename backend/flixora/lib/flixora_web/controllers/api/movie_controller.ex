defmodule FlixoraWeb.Api.MovieController do
  @moduledoc """
  API controller for managing movies.
  """

  use FlixoraWeb, :controller

  alias Flixora.Movies

  @doc "Returns a list of movies with optional filters."
  def index(conn, params) do
    movies = Movies.list_movies(params)
    render(conn, :index, movies: movies)
  end

  @doc "Returns a single movie by ID."
  def show(conn, %{"id" => id}) do
    case Movies.get_movie(id) do
      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Movie not found"})

      {:ok, movie} ->
        render(conn, :show, movie: movie)
    end
  end

  @doc "Creates a new movie."
  def create(conn, params) do
    movie_params = params["movie"] || params

    case Movies.create_movie(movie_params) do
      {:ok, movie} ->
        conn
        |> put_status(:created)
        |> render(:show, movie: movie)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: format_errors(changeset)})
    end
  end

  @doc "Updates an existing movie."
  def update(conn, %{"id" => id} = params) do
    movie_params = params["movie"] || params

    case Movies.get_movie(id) do
      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Movie not found"})

      {:ok, movie} ->
        case Movies.update_movie(id, movie_params) do
          {:ok, movie} ->
            render(conn, :show, movie: movie)

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> json(%{errors: format_errors(changeset)})
        end
    end
  end

  @doc "Deletes a movie."
  def delete(conn, %{"id" => id}) do
    case Movies.delete_movie(id) do
      {:ok, _} ->
        send_resp(conn, :no_content, "")

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Movie not found"})
    end
  end

  defp format_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
