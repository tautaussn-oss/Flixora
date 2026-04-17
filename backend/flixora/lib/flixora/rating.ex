defmodule Flixora.Rating do
  use Ecto.Schema
  import Ecto.Changeset

  schema "ratings" do
    field :score, :integer
    field :content_id, :id
    field :content_type, :string

    timestamps()
  end

  def changeset(rating, attrs) do
    rating
    |> cast(attrs, [:score, :content_id, :content_type])
    |> validate_required([:score, :content_id, :content_type])
    |> validate_number(:score, greater_than_or_equal_to: 1, less_than_or_equal_to: 5)
    |> validate_inclusion(:content_type, ["movie", "show"])
  end
end
