defmodule Flixora.Actor do
  use Ecto.Schema
  import Ecto.Changeset

  schema "actors" do
    field :name, :string
    field :birth_year, :integer
    field :photo, :string
    field :bio, :string

    many_to_many :shows, Flixora.Show,
      join_through: "shows_actors",
      on_replace: :delete

    many_to_many :movies, Flixora.Movie,
      join_through: "movies_actors",
      on_replace: :delete

    timestamps()
  end

  def changeset(actor, attrs) do
    actor
    |> cast(attrs, [:name, :birth_year, :bio, :photo])
    |> validate_required([:name, :birth_year])
    |> validate_number(:birth_year, less_than_or_equal_to: Date.utc_today().year)
    |> validate_length(:name, min: 1, max: 255)
    |> validate_length(:bio, max: 1000)
  end
end
