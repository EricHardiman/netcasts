class PodcastSerializer < ActiveModel::Serializer
  attributes :id, :title, :copyright, :description, :docs, :feed_url, :image_url, :language, :author, :explicit, :episodes

  def episodes
    "#{object.episodes.length}"
  end
end
