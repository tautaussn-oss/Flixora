defmodule Flixora.Movies.Genre do
  use Ecto.Schema
  import Ecto.Changeset

  schema "genres" do
    field(:genre, :string)

    many_to_many(:movies, Movie, join_through: "movie_genres", on_replace: :delete)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(category, attrs) do
    category
    |> cast(attrs, [:genre])
    |> validate_required([:genre])
    |> unique_constraint(:genre)
  end
end
