if @bookroom.save
  json.status 200
else
  json.status 404
end
