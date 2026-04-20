defmodule FlixoraWeb.Api.MovieController do
  use FlixoraWeb, :controller

  alias Flixora.Movies


  def index(conn, params) do
    movies = Movies.list_movies(params)
    json(conn, movies)
  end


  def show(conn, %{"id" => id}) do
    case Movies.get_movie(id) do
      {:ok, movie} ->
        json(conn, movie)

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Movie not found"})
    end
  end


  def create(conn, params) do
    case Movies.create_movie(params) do
      {:ok, movie} ->
        conn
        |> put_status(:created)
        |> json(movie)

      {:error, _changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Invalid data"})
    end
  end


  def update(conn, %{"id" => id} = params) do
    case Movies.update_movie(id, params) do
      {:ok, movie} ->
        json(conn, movie)

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Movie not found"})

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Update failed"})
    end
  end


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
end
