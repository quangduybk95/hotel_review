class Bookroom < ApplicationRecord
  belongs_to :user
  belongs_to :hotel
  CREATE_PARAMS = [:user_id, :hotel_id, :start, :end]
end
