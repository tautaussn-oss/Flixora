defmodule FlixoraWeb.Router do
  use FlixoraWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {FlixoraWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", FlixoraWeb do
    pipe_through :browser

    get "/", PageController, :home
  end

  scope "/api", FlixoraWeb.Api do
    pipe_through :api

    resources "/movies", MovieController, except: [:new, :edit]
    resources "/shows", ShowController, except: [:new, :edit]
    resources "/genres", GenreController, only: [:index, :show]
    resources "/actors", ActorController, only: [:index, :show]
    post "/movies", MovieController, :new
    put "/movies/:id", MovieController, :edit

    get "/users", UserController, :index
    get "/users/:id", UserController, :show
    post "/users", UserController, :create
    put "/users/:id", UserController, :update
    delete "/users/:id", UserController, :delete

    # post "/login", AuthController, :login
  end

  # Other scopes may use custom stacks.
  # scope "/api", FlixoraWeb do
  #   pipe_through :api
  # end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:flixora, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: FlixoraWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
