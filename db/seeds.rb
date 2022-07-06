# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


User.create!(first_name: "Hyun", last_name: "Cho", email: "hcho774@gmail.com", username: "hcho774", password_digest: "123", location: "208 park ave", img:"test", birth_date: 12/10/1991)
User.create!(first_name: "Amy", last_name: "Lee", email: "amy@gmail.com", username: "amy", password_digest: "123", location: "208 park ave", img:"test", birth_date: 12/11/1991)


Question.create!(questions: "Would you prefer to live alone?")

Answer.create!(user_id: 1, question_id: 1, answer: true, pitch: "because I am independent")
Answer.create!(user_id: 2, question_id: 1, answer: false, pitch: "no doubt about it" )

Room.create!(title: "cho's room")

Message.create!(user_id: 1, room_id: 1, body: "hello amy")
Message.create!(user_id: 2, room_id: 1, body: "hello cho")

puts "seeding done"