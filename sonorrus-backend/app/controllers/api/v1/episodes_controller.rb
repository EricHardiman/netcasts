class Api::V1::EpisodesController < ApplicationController
  before_action :authorized
  skip_before_action :authorized, only: [:index, :show]

  def index
    episodes = Episode.all.slice(0, 50)
    render json: episodes
  end

  def show
    episode = Episode.find(params[:id])
    render json: episode
  end
end
