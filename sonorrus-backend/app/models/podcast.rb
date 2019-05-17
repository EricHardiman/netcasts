class Podcast < ApplicationRecord
  has_many :users, through: :user_podcasts
  has_many :episodes
  has_many :podcast_categories
  has_many :categories, through: :podcast_categories
end
