class Api::V1::CommentsController < ApplicationController
  before_action :authorized

  def create
    comment = Comment.create(comment_params)
    render json:comment
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :episode_id)
  end
end
