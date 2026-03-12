defmodule FlixoraWeb.Api.GenreJSON do

  def index(%{genres: genres}) do
    %{
      data: for(genre <- genres, do: data(genre))
    }
  end

  def data(genre) do
    %{
      id: genre.id,
      genre: genre.genre
    }
  end

end
