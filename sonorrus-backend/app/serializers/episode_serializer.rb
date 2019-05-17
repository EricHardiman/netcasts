class EpisodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :enclosure_length, :enclosure_type, :enclosure_url, :pubdate, :guid, :duration, :explicit, :podcast, :comments, :ads

  def pubdate
    "#{object.pubdate.strftime('%B %d, %Y')}"
  end

  def comments
    object.comments.map {|comment| {:user => comment.user.username, :content => comment.content, :id => comment.id, :created_at => comment.created_at.strftime('%B, %d, %Y')}}
  end
end
