class Api::V1::PodcastsController < ApplicationController
  skip_before_action :authorized

  def index
    podcasts = Podcast.all
    render json: podcasts
  end

  def show
    podcast = Podcast.find(params[:id])
    render json: podcast
  end

  def episodes
    episodes = Podcast.find(params[:id]).episodes
    paginate json: episodes, per_page: 25
  end

  def all_episodes
    episodes = Podcast.find(params[:id]).episodes
    render json:episodes
  end

  def photos
    photos = Podcast.all.shuffle.map do |podcast|
      {
        :id => podcast.id,
        :src => podcast.image_url,
        :height => 1,
        :width => 1
      }
    end
    render json: photos
  end
end
