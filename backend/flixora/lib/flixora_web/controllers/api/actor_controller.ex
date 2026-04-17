defmodule FlixoraWeb.Api.ActorController do
  use FlixoraWeb, :controller

  alias Flixora.Actors

  def index(conn, _params) do
    actors = Actors.list_actors()
    render(conn, :index, actors: actors)
  end
end
