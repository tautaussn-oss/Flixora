defmodule FlixoraWeb.Api.UserController do
  use FlixoraWeb, :controller

  alias Flixora.Accounts

  def index(conn, _params) do
    users = Accounts.list_users()
    json(conn, users)
  end

  def show(conn, %{"id" => id}) do
    case Accounts.get_user(id) do
      {:ok, user} ->
        json(conn, user)

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User not found"})
    end
  end

  def create(conn, params) do
    case Accounts.create_user(params) do
      {:ok, user} ->
        conn
        |> put_status(:created)
        |> json(user)

      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Invalid data"})
    end
  end

  def update(conn, %{"id" => id} = params) do
    case Accounts.update_user(id, params) do
      {:ok, user} ->
        json(conn, user)

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User not found"})

      {:error, _} ->
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Update failed"})
    end
  end

  def delete(conn, %{"id" => id}) do
    case Accounts.delete_user(id) do
      {:ok, _} ->
        send_resp(conn, :no_content, "")

      {:error, :not_found} ->
        conn
        |> put_status(:not_found)
        |> json(%{error: "User not found"})
    end
  end
end
