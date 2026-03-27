defmodule Flixora.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      FlixoraWeb.Telemetry,
      Flixora.Repo,
      {DNSCluster, query: Application.get_env(:flixora, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Flixora.PubSub},
      # Start a worker by calling: Flixora.Worker.start_link(arg)
      # {Flixora.Worker, arg},
      # Start to serve requests, typically the last entry
      FlixoraWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Flixora.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    FlixoraWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
