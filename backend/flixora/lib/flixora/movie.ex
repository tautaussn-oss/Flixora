defmodule Flixora.Movie do
  use Ecto.Schema
  import Ecto.Changeset

  schema "movies" do
    field :title, :string
    field :description, :string
    field :year, :integer
    field :duration, :integer
    field :poster, :string
    field :trailer, :string
    field :public_id, :string
    field :kids, :boolean, default: false
    field :director, :string
    field :publisher, :string
    field :featured, :boolean, default: false
    field :season, :integer

    many_to_many :genres, Flixora.Genre, join_through: "movies_genres", on_replace: :delete
    many_to_many :actors, Flixora.Actor, join_through: "movies_actors", on_replace: :delete

    has_many :ratings, Flixora.Rating, foreign_key: :content_id, where: [content_type: "movie"]

   timestamps()
  end

  def changeset(movie, attrs) do
    movie
    |> cast(attrs, [
      :title,
      :description,
      :year,
      :duration,
      :poster,
      :trailer,
      :public_id,
      :kids,
      :director,
      :publisher,
      :featured,
      :season
    ])
    |> validate_required([
      :title,
      :description,
      :year,
      :duration
    ])
    |> validate_number(:year, greater_than_or_equal_to: 1900, less_than_or_equal_to: 2100)
    |> validate_number(:duration, greater_than: 0)
    |> validate_length(:title, min: 1, max: 255)
    |> validate_length(:description, max: 1000)
  end
end
