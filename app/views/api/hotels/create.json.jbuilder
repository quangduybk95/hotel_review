if @hotel.save
  json.status 200
  json.id @hotel.id
else
  json.status 400
end
