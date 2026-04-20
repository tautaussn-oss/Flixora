defmodule Flixora.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :email, :string
    field :password, :string, virtual: true
    # ovo ide u bazu
    field :password_hash, :string

    has_many :ratings , Flixora.Ratings.Rating

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email])
    |> maybe_require_password()
    |> maybe_validate_password()
    |> maybe_put_password_hash()
  end

  defp maybe_require_password(changeset) do
    if changeset.data.id == nil do
      validate_required(changeset, [:password])
    else
      changeset
    end
  end

  defp maybe_validate_password(changeset) do
    if get_change(changeset, :password) do
      validate_length(changeset, :password, min: 6)
    else
      changeset
    end
  end

  defp maybe_put_password_hash(changeset) do
    if password = get_change(changeset, :password) do
      change(changeset, password_hash: Bcrypt.hash_pwd_salt(password))
    else
      changeset
    end
  end
end
