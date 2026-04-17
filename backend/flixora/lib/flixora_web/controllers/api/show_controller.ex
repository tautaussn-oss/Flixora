defmodule FlixoraWeb.Api.ShowController do
  use FlixoraWeb, :controller

  alias Flixora.Shows

  def index(conn, params) do
    shows = Shows.list_shows(params)
    render(conn, shows: shows)
  end

  def show(conn, %{"id" => id}) do
  case Shows.get_show(id) do
    {:ok, show} ->
      render(conn, :show, show: show)

    {:error, :not_found} ->
      conn
      |> put_status(:not_found)
      |> json(%{error: "Movie not found"})
  end
end
end
