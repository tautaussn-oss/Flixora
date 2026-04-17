defmodule Flixora.Genres do

  import Ecto.Query
  alias Flixora.Repo

  alias Flixora.Genre

  def list_genres do
    Repo.all(Genre)
  end

end
