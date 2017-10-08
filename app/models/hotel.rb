class Hotel < ApplicationRecord
  UPDATE_PARAMS = [:name, :address, :phone, :link, :image, :stars, :cost, :latitude, :longitude].freeze
  belongs_to :user
  has_many :reviews
end
