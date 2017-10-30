@like = @hotel.likes.find_by(user_id: params[:user_id])
json.hotel do
  json.info @hotel
  json.like @hotel.likes.size
  json.liked @like ? true : false
  json.like_id @like ? @like.id : -1
  json.reviews @hotel.reviews do |review|
    json.user_id review.user.id
    json.user_name review.user.profile.name
    json.comment review.comment
    json.rate review.rate
    json.created_at review.created_at
    json.image review.user.profile.avatar
  end
end
