defmodule Flixora.Actors.Actor do
  use Ecto.Schema
  import Ecto.Changeset

  schema "actors" do
    field :name, :string
    field :birth_year, :integer
    field :photo, :string
    field :bio, :string

    many_to_many :shows, Flixora.Shows.Show,
      join_through: "shows_actors",
      on_replace: :delete

    many_to_many :movies, Flixora.Movies.Movie,
      join_through: "movies_actors",
      on_replace: :delete

    timestamps()
  end

  def changeset(actor, attrs) do
    actor
    |> cast(attrs, [:name, :birth_year, :bio, :photo])
    |> validate_required([:name, :birth_year])
    |> validate_number(:birth_year, greater_than: 1800)
    |> validate_length(:name, min: 2, max: 255)
    |> validate_length(:bio, min: 10, max: 1000)
  end
end
