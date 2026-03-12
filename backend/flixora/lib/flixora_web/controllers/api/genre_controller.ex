defmodule FlixoraWeb.GenreController do

  use FlixoraWeb,:controller

  alias Flixora.Movies.Genre
  alias Flixora.Genres



  def index(conn, _params ) do

    genres = Genres.list_genres()
      render(conn, :index, genres: genres )

  end


end
