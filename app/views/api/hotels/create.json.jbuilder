if @hotel.save
  json.status 200
else
  json.status 400
end
