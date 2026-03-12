defmodule Flixora.Repo.Migrations.AddRatingToMovies do
  use Ecto.Migration

  def change do
    alter table(:movies) do
      add :rating, :float
  end

  end
end
