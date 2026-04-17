defmodule Flixora.Repo.Migrations.CreateActors do
  use Ecto.Migration

  def change do
    create table(:actors) do
      add :name, :string, null: false
      add :bio, :text
      add :birth_year, :integer
      add :photo, :string

      timestamps()
    end

    create index(:actors, [:name])
  end
end
