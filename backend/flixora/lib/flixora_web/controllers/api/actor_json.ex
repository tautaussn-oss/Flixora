defmodule FlixoraWeb.Api.ActorJSON do
  alias Flixora.Actors.Actor

  def index(%{actors: actors}) do
    %{actors: Enum.map(actors, &data/1)}
  end

  def show(%{actor: actor}) do
    %{actor: data(actor)}
  end

  defp data(%Actor{} = actor) do
    %{
      id: actor.id,
      name: actor.name,
      birth_year: actor.birth_year,
      photo: actor.photo,
      bio: actor.bio
    }
  end
end
