class Api::V1::AdsController < ApplicationController
  before_action :authorized

  def create
    newAd = Ad.create(ad_params)
    render json:newAd
  end

  private

  def ad_params
    params.require(:ad).permit(:start_time, :stop_time, :company, :promo_code, :episode_id)
  end
end