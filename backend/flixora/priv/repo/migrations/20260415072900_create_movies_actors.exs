defmodule Flixora.Repo.Migrations.CreateMoviesActors do
  use Ecto.Migration

  def change do
    create table(:movies_actors) do
      add :movie_id, references(:movies, on_delete: :delete_all), null: false
      add :actor_id, references(:actors, on_delete: :delete_all), null: false

    end

    create unique_index(:movies_actors, [:movie_id, :actor_id])
  end
end
