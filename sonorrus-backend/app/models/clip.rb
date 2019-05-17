class Clip < ApplicationRecord
  belongs_to :episode
  has_many :users, through: :user_clips
end
