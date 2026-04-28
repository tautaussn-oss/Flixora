defmodule Flixora.Repo.Migrations.DeleteTimestampsManyToManyTables do
  use Ecto.Migration

  def change do
    alter table(:movies_actors) do
      remove :inserted_at
      remove :updated_at
    end

    alter table(:shows_actors) do
      remove :inserted_at
      remove :updated_at
    end

    alter table(:movies_genres) do
      remove :inserted_at
      remove :updated_at
    end

    # alter table(:shows_genres) do
    #   remove :inserted_at
    #   remove :updated_at
    # end
  end
end
