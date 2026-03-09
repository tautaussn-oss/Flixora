defmodule Flixora.Movies do


  alias Flixora.Repo
  alias Flixora.Movies.Movie


  def list_all do
    Repo.all(Movie)
  end

  def get_movie!(id) do

    Repo.get!(Movie, id)

  end

end
