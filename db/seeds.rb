# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
(1..50).each do |user|
  User.create(
    email: "user#{user}@gmail.com",
    password: "123456",
  )
end

User.all.each do |user|
  user.update_attributes(
    profile_attributes: {
      name: Faker::Name.name,
      birthday: rand(40.years.ago..16.years.ago),
      phonenumber: Faker::PhoneNumber.phone_number,
      gender: rand(0..2),
      avatar: Faker::Avatar.image,
      description: Faker::Lorem.sentence
    }
  )
end

(1..200).each do |hotel|
  Hotel.create(
    name: Faker::Company.name,
    address: Faker::Address.name,
    phone: Faker::PhoneNumber.phone_number,
    link: "https://google.com",
    image: "http://www.rwsentosa.com/portals/0/rws%20revamp/hotels/hard%20rock%20hotel/Gallery/Enlarge/HRH01.jpg",
    stars: rand(1..7),
    cost: rand(30..100),
    latitude: rand(20.990127..21.0312335),
    longitude: rand(105.795982..105.856032),
    user_id: rand(1..50),
    description: Faker::Lorem.paragraph
  )
end

Hotel.all.each do |hotel|
  Review.create(
    comment: Faker::Lorem.sentence,
    user_id: hotel.user.id,
    hotel_id: hotel.id,
    rate: rand(1..5)
  )
  (1..10).each do |like|
    Like.create!(
      user_id: like,
      hotel_id: hotel.id
    )
  end
end

User.all.each do |user|
  Bookroom.create(
         user_id: user.id,
         hotel_id: rand(1..30),
         start: rand(5.days.from_now..10.days.from_now),
         end: rand(11.days.from_now..15.days.from_now)
  )
end
