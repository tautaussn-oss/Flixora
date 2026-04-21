defmodule FlixoraWeb.Api.MovieJSON do
  alias Flixora.Movies.Movie

  def index(%{movies: movies}) do
    %{movies: Enum.map(movies, &data/1)}
  end

  def show(%{movie: movie}) do
    %{movie: data(movie)}
  end

  defp data(%Movie{} = movie) do
    %{
      id: movie.id,
      title: movie.title,
      description: movie.description,
      year: movie.year,
      duration: movie.duration,
      poster: movie.poster,
      trailer: movie.trailer,
      featured: movie.featured,
      kids: movie.kids,
      director: movie.director,
      publisher: movie.publisher,
      season: movie.season,
      genres: safe_entities(movie.genres),
      actors: safe_entities(movie.actors)
    }
  end

  defp safe_entities(%Ecto.Association.NotLoaded{}), do: []

  defp safe_entities(list) do
    Enum.map(list, fn item ->
      %{id: item.id, name: item.name}
    end)
  end
end
