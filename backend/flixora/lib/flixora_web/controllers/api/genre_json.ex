defmodule FlixoraWeb.Api.GenreJSON do
  alias Flixora.Genres.Genre

  def index(%{genres: genres}) do
    %{genres: Enum.map(genres, &data/1)}
  end

  def show(%{genre: genre}) do
    %{genre: data(genre)}
  end

  defp data(%Genre{} = genre) do
    %{
      id: genre.id,
      name: genre.name
    }
  end
end
