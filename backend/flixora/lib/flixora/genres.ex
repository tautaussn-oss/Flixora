defmodule Flixora.Genres do

  alias Flixora.Repo
  alias Flixora.Movies.Genre
  def list_genres do
    Repo.all(Genre)
  end

end
