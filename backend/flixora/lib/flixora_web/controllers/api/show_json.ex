defmodule FlixoraWeb.Api.ShowJSON do
  alias Flixora.Show

  def index(%{shows: shows}) do
    %{shows: Enum.map(shows, &data/1)}
  end

  def show(%{show: show}) do
    %{data: data(show)}
  end

  defp data(%Show{} = show) do
    %{
      id: show.id,
      title: show.title,
      description: show.description,
      year: show.year,
      duration: show.duration,
      poster: show.poster,
      featured: show.featured,
      kids: show.kids,
      director: show.director,
      publisher: show.publisher,
      genres: Enum.map(show.genres, & &1.name),
      actors: Enum.map(show.actors, & &1.name)
    }
  end



end
