defmodule FlixoraWeb.Api.AuthController do


  use FlixoraWeb , :controller

  alias Flixora.Accounts


   def login(conn, %{"email" => email, "password" => password}) do
    case Accounts.authenticate_user(email, password) do
      {:ok, user} ->
        json(conn, %{
          message: "Login successful",
          user: user
        })

      {:error, _} ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "Invalid credentials"})
    end
  end

end
