class Episode < ApplicationRecord
  has_many :ads
  has_many :clips
  has_many :comments
  has_many :users, through: :comments
  belongs_to :podcast
end
