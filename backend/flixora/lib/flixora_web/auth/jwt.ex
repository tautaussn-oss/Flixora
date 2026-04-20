defmodule FlixoraWeb.Auth.JWT do
  use Joken.Config

  @secret "super_secret_key"

  @impl true
  def token_config do
    default_claims()
  end

  def generate_token(user) do
    {:ok, token, _claims} =
      generate_and_sign(%{"user_id" => user.id}, @secret)

    token
  end

  def verify_token(token) do
    verify_and_validate(token, @secret)
  end
end
