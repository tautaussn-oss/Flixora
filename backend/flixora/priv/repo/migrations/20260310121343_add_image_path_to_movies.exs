defmodule Flixora.Repo.Migrations.AddImagePathToMovies do
  use Ecto.Migration

  def change do

    alter table(:movies) do
      add :image_path, :string
    end

  end
end
