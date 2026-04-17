defmodule Flixora.Repo.Migrations.CreateShowsActors do
  use Ecto.Migration

  def change do
    create table(:shows_actors) do
      add :show_id, references(:shows, on_delete: :delete_all)
      add :actor_id, references(:actors, on_delete: :delete_all)
    end

    create unique_index(:shows_actors, [:show_id, :actor_id])
  end
end
