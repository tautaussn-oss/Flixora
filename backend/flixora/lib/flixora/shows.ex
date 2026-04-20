defmodule Flixora.Shows do
  import Ecto.Query
  alias Flixora.Repo
  alias Flixora.Shows.Show
  alias Flixora.Genres.Genre
  alias Flixora.Actors.Actor
  alias Flixora.Uploaders.Cloudinary

  @show_preloads [:genres, :actors, :ratings]

  def list_shows(params \\ %{}) do
    Show
    |> search_by_title(params)
    |> filter_by_genre(params)
    |> filter_by_actor(params)
    |> filter_featured(params)
    |> filter_kids(params)
    |> sort(params)
    |> preload(^@show_preloads)
    |> Repo.all()
  end

  defp search_by_title(query, %{"search" => term}) do
    from s in query, where: ilike(s.title, ^"%#{term}%")
  end

  defp search_by_title(query, _), do: query

  defp filter_by_genre(query, %{"genre" => genres}) do
    genres = List.wrap(genres)

    if genres == [] do
      query
    else
      from s in query,
        join: g in assoc(s, :genres),
        where: g.name in ^genres,
        group_by: s.id,
        having: count(g.id) == ^length(genres)
    end
  end

  defp filter_by_genre(query, _), do: query

  defp filter_by_actor(query, %{"actor" => actors}) do
    actors = List.wrap(actors)

    if actors == [] do
      query
    else
      from s in query,
        join: a in assoc(s, :actors),
        where: a.name in ^actors,
        group_by: s.id,
        having: count(a.id) == ^length(actors)
    end
  end

  defp filter_by_actor(query, _), do: query

  defp filter_featured(query, %{"featured" => "true"}) do
    from s in query, where: s.featured == true
  end

  defp filter_featured(query, _), do: query

  defp filter_kids(query, %{"kids" => "true"}) do
    from s in query, where: s.kids == true
  end

  defp filter_kids(query, _), do: query

  defp sort(query, %{"sort" => "year"}) do
    from m in query, order_by: [desc: m.year]
  end

  defp sort(query, %{"sort" => "title"}) do
    from m in query, order_by: [asc: m.title]
  end

  defp sort(query, %{"sort" => "duration"}) do
    from m in query, order_by: [desc: m.duration]
  end

  defp sort(query, _), do: query

  def get_show(id) do
    case Repo.get(Show, id) do
      nil -> {:error, :not_found}
      show -> {:ok, Repo.preload(show, @show_preloads)}
    end
  end

  def create_show(attrs) do
    attrs =
      case Map.get(attrs, "poster") do
        %Plug.Upload{path: path} ->
          case Cloudinary.upload_image(path) do
            {:ok, %{url: url, public_id: public_id}} ->
              attrs
              |> Map.put("poster", url)
              |> Map.put("public_id", public_id)

            {:error, _} ->
              Map.delete(attrs, "poster")
          end

        _ ->
          attrs
      end

    %Show{}
    |> Show.changeset(attrs)
    |> put_genres(attrs)
    |> put_actors(attrs)
    |> Repo.insert()
  end

  def update_show(id, attrs) do
    case Repo.get(Show, id) do
      nil ->
        {:error, :not_found}

      show ->
        show = Repo.preload(show, [:genres, :actors])

        attrs =
          case Map.get(attrs, "poster") do
            %Plug.Upload{path: path} ->
              case Cloudinary.upload_image(path) do
                {:ok, %{url: url, public_id: public_id}} ->
                  if show.public_id do
                    Cloudinary.delete_image(show.public_id)
                  end

                  attrs
                  |> Map.put("poster", url)
                  |> Map.put("public_id", public_id)

                {:error, _} ->
                  Map.delete(attrs, "poster")
              end

            _ ->
              attrs
          end

        show
        |> Show.changeset(attrs)
        |> put_genres(attrs)
        |> put_actors(attrs)
        |> Repo.update()
    end
  end

  def delete_show(id) do
    case Repo.get(Show, id) do
      nil ->
        {:error, :not_found}

      show ->
        if show.public_id do
          Cloudinary.delete_image(show.public_id)
        end

        Repo.delete(show)
    end
  end

  defp put_genres(changeset, attrs) do
    case Map.get(attrs, "genre_ids") do
      nil ->
        changeset

      genre_ids ->
        genre_ids =
          Enum.map(genre_ids, fn
            id when is_binary(id) -> String.to_integer(id)
            id when is_integer(id) -> id
          end)

        genres =
          from(g in Genre, where: g.id in ^genre_ids)
          |> Repo.all()

        Ecto.Changeset.put_assoc(changeset, :genres, genres)
    end
  end

  defp put_actors(changeset, attrs) do
    case Map.get(attrs, "actor_ids") do
      nil ->
        changeset

      actor_ids ->
        actor_ids =
          Enum.map(actor_ids, fn
            id when is_binary(id) -> String.to_integer(id)
            id when is_integer(id) -> id
          end)

        actors =
          from(a in Actor, where: a.id in ^actor_ids)
          |> Repo.all()

        Ecto.Changeset.put_assoc(changeset, :actors, actors)
    end
  end
end
