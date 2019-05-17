class CommentSerializer < ActiveModel::Serializer
  attributes :user, :content, :created_at

  def created_at
    "#{object.created_at.strftime('%B %d, %Y')}"
  end

  def user
    "#{object.user.username}"
  end
end