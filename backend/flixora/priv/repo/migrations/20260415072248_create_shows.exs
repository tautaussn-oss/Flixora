defmodule Flixora.Repo.Migrations.CreateShows do
  use Ecto.Migration

  def change do
    create table(:shows) do
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

    create index(:shows, [:title])
    create index(:shows, [:year])
    create index(:shows, [:featured])
    create index(:shows,[:kids])
  end
end
