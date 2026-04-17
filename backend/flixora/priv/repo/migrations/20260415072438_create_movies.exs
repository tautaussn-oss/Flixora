defmodule Flixora.Repo.Migrations.CreateMovies do
  use Ecto.Migration

  def change do
    create table(:movies) do
      add :title, :string, null: false
      add :description, :text, null: false
      add :year, :integer, null: false
      add :duration, :integer, null: false
      add :poster, :string
      add :trailer, :string
      add :public_id, :string
      add :kids, :boolean, default: false, null: false
      add :director, :string
      add :publisher, :string
      add :featured, :boolean, default: false, null: false
      add :season, :integer
      timestamps()
    end

    create index(:movies, [:title])
    create index(:movies, [:year])
    create index(:movies, [:featured])
    create index(:movies, [:kids])
  end
end
