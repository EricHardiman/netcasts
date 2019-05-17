class Api::V1::CategoriesController < ApplicationController
  skip_before_action :authorized

  def index
    categories = Category.all
    render json: categories
  end
end