defmodule Flixora.Repo.Migrations.CreateRatings do
  use Ecto.Migration

  def change do
    create table(:ratings) do
      add :score, :integer, null: false
      add :content_id, :id , null: false
      add :content_type, :string, null: false

      timestamps()
    end

    create index(:ratings, [:content_id, :content_type])
  end
end
