defmodule Flixora.Repo.Migrations.AddTrailers do
  use Ecto.Migration

  def change do
    alter table(:movies) do
      add(:trailer_embed, :text)
    end
  end
end
