defmodule FlixoraWeb.PageController do
  use FlixoraWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
