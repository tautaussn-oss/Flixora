defmodule Flixora.Repo.Migrations.CreateRatings do
  use Ecto.Migration

  def change do
    create table(:ratings) do
      add :score, :integer, null: false
      add :content_id, :integer, null: false
      add :content_type, :string, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:ratings, [:content_id, :content_type])
    create unique_index(:ratings, [:user_id, :content_id, :content_type])

    create constraint(:ratings, :content_type_check, check: "content_type IN ('movie', 'show')")
  end
end
