defmodule Flixora.Repo.Migrations.CreateMoviesGenres do
  use Ecto.Migration

  def change do
    create table(:movies_genres) do
      add :movie_id, references(:movies, on_delete: :delete_all)
      add :genre_id, references(:genres, on_delete: :delete_all)
    end

    create unique_index(:movies_genres, [:movie_id, :genre_id])
  end
end
