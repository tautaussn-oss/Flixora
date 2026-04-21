defmodule FlixoraWeb.Api.ShowController do
  @moduledoc """
  API controller for managing shows.
  """

  use FlixoraWeb, :controller

  alias Flixora.Shows

  @doc "Returns a list of shows with optional filters."
  def index(conn, params) do
    shows = Shows.list_shows(params)
    render(conn, :index, shows: shows)

  def index(conn, params) do
    shows = Shows.list_shows(params)
    json(conn, shows)
  end

  @doc "Returns a single show by ID."
  def show(conn, %{"id" => id}) do
    case Shows.get_show(id) do
      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "Show not found"})

      {:ok, show} ->
        render(conn, :show, show: show)
    end
  end

  @doc "Creates a new show."
  def create(conn, params) do
    show_params = params["show"] || params

    case Shows.create_show(show_params) do
      {:ok, show} ->
        conn
        |> put_status(:created)
        |> render(:show, show: show)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{errors: format_errors(changeset)})
    end
  end

  @doc "Updates an existing show."
  def update(conn, %{"id" => id} = params) do
    show_params = params["show"] || params

    case Shows.get_show(id) do
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

      {:ok, show} ->
        case Shows.update_show(show, show_params) do
          {:ok, show} ->
            render(conn, :show, show: show)

          {:error, changeset} ->
            conn
            |> put_status(:unprocessable_entity)
            |> json(%{errors: format_errors(changeset)})
        end
    end
  end

  @doc "Deletes a show."
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

  defp format_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
