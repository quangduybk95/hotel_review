class Review < ApplicationRecord
  UPDATE_PARAMS = [:comment, :rate].freeze
  CREATE_PARAMS = [:user_id, :hotel_id, :comment, :rate].freeze
  belongs_to :user
  belongs_to :hotel
end
