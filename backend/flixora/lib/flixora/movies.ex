defmodule Flixora.Movies do


  alias Flixora.Repo
  alias Flixora.Movies.Movie


  def list_all do
    Repo.all(Movie)
  end

  def get_movie!(id) do

    Repo.get!(Movie, id)

  end
     def create_movie(attrs) do
      %Movie{}
      |>Movie.changeset(attrs)
      |> Repo.insert()

     end




    def delete_movie(id) do
      movie = Repo.get!(Movie, id)
      Repo.delete(movie)
    end


end
