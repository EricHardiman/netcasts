class User < ApplicationRecord
  has_secure_password
  validates :username, uniqueness: { case_sensitive: false }
  has_many :podcasts, through: :user_podcasts
  has_many :ads, through: :user_ads
  has_many :comments
  has_many :clips, through: :user_clips
end
