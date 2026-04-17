defmodule FlixoraWeb.Api.MovieJSON do
  alias Flixora.Movie

  def index(%{movies: movies}) do
    %{movies: Enum.map(movies, &data/1)}
  end

  def show(%{movie: movie}) do
    %{data: data(movie)}
  end

  defp data(%Movie{} = movie) do
    %{
      id: movie.id,
      title: movie.title,
      description: movie.description,
      year: movie.year,
      duration: movie.duration,
      poster: movie.poster,
      featured: movie.featured,
      kids: movie.kids,
      director: movie.director,
      publisher: movie.publisher,
      genres: Enum.map(movie.genres, & &1.name),
      actors: Enum.map(movie.actors, & &1.name)
    }
  end
end
