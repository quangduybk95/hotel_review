json.bookrooms do
  json.array! @bookrooms do |bookroom|
    json.hotel bookroom.hotel
    json.bookroom bookroom
    json.cost bookroom.hotel.cost*(bookroom.start..bookroom.end).to_a.size
    json.days (bookroom.start..bookroom.end).to_a.size
  end
end
