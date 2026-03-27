defmodule Flixora.Repo do
  use Ecto.Repo,
    otp_app: :flixora,
    adapter: Ecto.Adapters.Postgres
end
