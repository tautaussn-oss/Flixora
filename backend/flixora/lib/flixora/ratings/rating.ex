defmodule Flixora.Ratings.Rating do
  use Ecto.Schema
  import Ecto.Changeset

  schema "ratings" do
    field :score, :integer
    field :content_id, :integer
    field :content_type, :string



      belongs_to :user, Flixora.Accounts.User


    timestamps()
  end

  def changeset(rating, attrs) do
    rating
    |> cast(attrs, [:score, :content_id, :content_type, :user_id])
    |> validate_required([:score, :content_id, :content_type, :user_id])
    |> validate_number(:score, greater_than_or_equal_to: 1, less_than_or_equal_to: 5)
    |> validate_inclusion(:content_type, ["movie", "show"])
    |> validate_number(:content_id, greater_than: 0)
    |> unique_constraint([:user_id, :content_id, :content_type])
  end
end
