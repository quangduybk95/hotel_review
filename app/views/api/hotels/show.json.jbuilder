json.hotel do
  json.info @hotel
  json.reviews @hotel.reviews do |review|
    json.user_id review.user.id
    json.comment review.comment
    json.created_at review.created_at
    json.image review.user.profile.avatar
  end
end
