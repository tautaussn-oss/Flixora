defmodule Flixora.Repo.Migrations.CreateShowsGenres do
  use Ecto.Migration

  def change do
    create table(:shows_genres) do
      add :show_id, references(:shows, on_delete: :delete_all)
      add :genre_id, references(:genres, on_delete: :delete_all)
    end

    create unique_index(:shows_genres, [:show_id, :genre_id])
  end
end
