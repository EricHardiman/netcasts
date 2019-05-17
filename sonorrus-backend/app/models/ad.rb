class Ad < ApplicationRecord
  belongs_to :episode
  has_many :users, through: :user_ads
end
