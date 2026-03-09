defmodule Flixora.Movies.Movie do
  use Ecto.Schema
  import Ecto.Changeset

  schema "movies" do
    field(:title, :string)
    field(:description, :string)
    field(:year, :integer)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(movie, attrs) do
    movie
    |> cast(attrs, [:title, :description, :year])
    |> validate_required([:title, :description, :year])
  end
  

end
