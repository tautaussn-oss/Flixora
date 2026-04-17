defmodule Flixora.Genre do
  use Ecto.Schema
  import Ecto.Changeset

  schema "genres" do
    field :name, :string

    many_to_many :shows, Flixora.Show, join_through: "shows_genres", on_replace: :delete
    many_to_many :movies ,Flixora.Movie, join_through: "movies_genres", on_replace: :delete
    timestamps()
  end

  def changeset(genre, attrs) do
    genre
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> validate_length(:name, min: 1, max: 100)
  end
end
