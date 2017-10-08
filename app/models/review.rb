class Review < ApplicationRecord
  UPDATE_PARAMS = [:comment, :rate].freeze
  belongs_to :user
  belongs_to :hotel
end
