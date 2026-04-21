defmodule FlixoraWeb.Api.ShowJSON do
  alias Flixora.Shows.Show

  def index(%{shows: shows}) do
    %{shows: Enum.map(shows, &data/1)}
  end

  def show(%{show: show}) do
    %{show: data(show)}
  end

  defp data(%Show{} = show) do
    %{
      id: show.id,
      title: show.title,
      description: show.description,
      year: show.year,
      season: show.season,
      trailer: show.trailer,
      featured: show.featured,
      kids: show.kids,
      poster: show.poster,
      genres: safe_entities(show.genres),
      actors: safe_entities(show.actors)
    }
  end

  defp safe_entities(%Ecto.Association.NotLoaded{}), do: []

  defp safe_entities(list) do
    Enum.map(list, fn item ->
      %{id: item.id, name: item.name}
    end)
  end
end
