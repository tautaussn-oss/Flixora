defmodule Flixora.Movies.Movie do
  use Ecto.Schema
  import Ecto.Changeset

  schema "movies" do
    field(:title, :string)
    field(:description, :string)
    field(:year, :integer)
    field(:trailer_embed, :string)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(movie, attrs) do
    movie
    |> cast(attrs, [:title, :description, :year, :trailer_embed])
    |> validate_required([:title, :description, :year])
  end
end
