# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


User.create!(first_name: "Hyun", last_name: "Cho", email: "hcho774@gmail.com", username: "hcho774", password_digest: BCrypt::Password.create("123"), location: "24 park ave", img:"test", birth_date: "12/10/1991")
User.create!(first_name: "Amy", last_name: "Lee", email: "amy@gmail.com", username: "amy", password_digest: BCrypt::Password.create("123"), location: "23 park ave", img:"test", birth_date: "12/10/1991")
User.create!(first_name: "Kim", last_name: "Kim", email: "kim@gmail.com", username: "kim", password_digest: BCrypt::Password.create("123"), location: "2 park ave", img:"test", birth_date: "12/10/1991")
User.create!(first_name: "him", last_name: "him", email: "him@gmail.com", username: "him", password_digest: BCrypt::Password.create("123"), location: "8 park ave", img:"test", birth_date: "12/10/1991")
User.create!(first_name: "her", last_name: "her", email: "her@gmail.com", username: "her", password_digest: BCrypt::Password.create("123"), location: "1 park ave", img:"test", birth_date: "12/10/1991")
User.create!(first_name: "them", last_name: "them", email: "them@gmail.com", username: "them", password_digest: BCrypt::Password.create("123"), location: "95 park ave", img:"test", birth_date: "12/10/1991")


Question.create!(questions: "Would you prefer to live alone?")

Answer.create!(user_id: 1, question_id: 1, answer: true, pitch: "because I am independent")
Answer.create!(user_id: 2, question_id: 1, answer: false, pitch: "no doubt about it" )
Answer.create!(user_id: 3, question_id: 1, answer: true, pitch: "can't live without it" )
Answer.create!(user_id: 4, question_id: 1, answer: false, pitch: "nothing is impossible" )
Answer.create!(user_id: 5, question_id: 1, answer: true, pitch: "boy you should know that" )
Answer.create!(user_id: 6, question_id: 1, answer: false, pitch: "want it all" )

Room.create!(title: "cho & Amy's room", sender_id: 1, recipient_id: 2)

Message.create!(user_id: 1, room_id: 1, body: "hello amy")
Message.create!(user_id: 2, room_id: 1, body: "hello cho")

puts "seeding done"