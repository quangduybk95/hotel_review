class Hotel < ApplicationRecord
  UPDATE_PARAMS = [:name, :address, :phone, :link, :image, :stars, :cost, :latitude, :longitude, :description].freeze
  CREATE_PARAMS = [:name, :address, :phone, :link, :image, :stars, :cost, :latitude, :longitude, :user_id, :description].freeze
  mount_base64_uploader :image, ImageUploader
  belongs_to :user
  has_many :reviews
  has_many :likes
  scope :random, -> { order(Arel::Nodes::NamedFunction.new('RANDOM', [])) }
  has_many :bookrooms
end
