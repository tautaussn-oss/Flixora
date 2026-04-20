defmodule FlixoraWeb.Api.ShowController do
  use FlixoraWeb, :controller

  alias Flixora.Shows


  def index(conn, params) do
    shows = Shows.list_shows(params)
    json(conn, shows)
  end

  def show(conn, %{"id" => id}) do
    case Shows.get_show(id) do
      {:ok, show} ->
        json(conn, show)

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Show not found"})
    end
  end

  def create(conn, params) do
    case Shows.create_show(params) do
      {:ok, show} ->
        conn
        |> put_status(:created)
        |> json(show)

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Invalid data"})
    end
  end

  def update(conn, %{"id" => id} = params) do
    case Shows.update_show(id, params) do
      {:ok, show} ->
        json(conn, show)

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Show not found"})

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Update failed"})
    end
  end


  def delete(conn, %{"id" => id}) do
    case Shows.delete_show(id) do
      {:ok, _} ->
        send_resp(conn, :no_content, "")

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Show not found"})
    end
  end
end
