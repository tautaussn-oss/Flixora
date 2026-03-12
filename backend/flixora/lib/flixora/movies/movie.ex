defmodule Flixora.Movies.Movie do
  use Ecto.Schema
  import Ecto.Changeset

  schema "movies" do
    field(:title, :string)
    field(:description, :string)
    field(:year, :integer)
    field(:image_path, :string)
    field(:trailer_embed, :string)
    field(:rating,:float)

    many_to_many(:genres, Genre, join_through: "movie_genres", on_replace: :delete)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(movie, attrs) do
    movie
    |> cast(attrs, [:title, :description, :year, :image_path, :trailer_embed,:rating])
    |> validate_required([:title, :description, :year])
  end
end
