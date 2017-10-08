json.users do
  json.array! @users do |user|
    json.email user.email
    json.id user.id
    json.locations_count user.locations.size
  end
end
