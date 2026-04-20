defmodule Flixora.Actors do
  import Ecto.Query
  alias Flixora.Repo

  alias Flixora.Actors.Actor

  def list_actors do
    Repo.all(Actor)
  end
end
