class Like < ApplicationRecord
  belongs_to :user
  belongs_to :hotel
  LIKE_PARAMS = [:user_id]
end
