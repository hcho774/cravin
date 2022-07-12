# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


User.create!(first_name: "Hyun", username: "hcho774", password_digest: BCrypt::Password.create("123"), dob_day: "10", dob_month:"12", dob_year: "1991", show_gender: false, gender_identity: "man", gender_interest:"woman",img:"test", matches: 0)
User.create!(first_name: "Amy", username: "amy", password_digest: BCrypt::Password.create("123"), dob_day: "6", dob_month:"2",dob_year: "1991",show_gender: false,  gender_identity: "woman", gender_interest: "man", img:"test", matches: 0)
User.create!(first_name: "Kim", username: "kim", password_digest: BCrypt::Password.create("123"), dob_day: "6", dob_month:"2",dob_year: "1991",show_gender: false,  gender_identity: "woman", gender_interest: "man", img:"", matches: 0)
User.create!(first_name: "Lil", username: "lil", password_digest: BCrypt::Password.create("123"), dob_day: "6", dob_month:"2",dob_year: "1991",show_gender: false,  gender_identity: "woman", gender_interest: "man", img:"test", matches: 0)
User.create!(first_name: "Elsa", username: "elsa", password_digest: BCrypt::Password.create("123"), dob_day: "6", dob_month:"2",dob_year: "1991",show_gender: false,  gender_identity: "woman", gender_interest: "man", img:"test", matches: 0)
# User.create!(first_name: "Kim", username: "kim", password_digest: BCrypt::Password.create("123"), dob_day: "2 park ave", img:"test", birth_date: "12/10/1991")
# User.create!(first_name: "him",  username: "him", password_digest: BCrypt::Password.create("123"), dob_day: "8 park ave", img:"test", birth_date: "12/10/1991")
# User.create!(first_name: "her", username: "her", password_digest: BCrypt::Password.create("123"), dob_day: "1 park ave", img:"test", birth_date: "12/10/1991")
# User.create!(first_name: "them", username: "them", password_digest: BCrypt::Password.create("123"), dob_day: "95 park ave", img:"test", birth_date: "12/10/1991")


Question.create!(questions: "Would you prefer to live alone?")

Answer.create!(user_id: 1, question_id: 1, answer: true, pitch: "because I am independent")
Answer.create!(user_id: 2, question_id: 1, answer: false, pitch: "no doubt about it" )
# Answer.create!(user_id: 3, question_id: 1, answer: true, pitch: "can't live without it" )
# Answer.create!(user_id: 4, question_id: 1, answer: false, pitch: "nothing is impossible" )
# Answer.create!(user_id: 5, question_id: 1, answer: true, pitch: "boy you should know that" )
# Answer.create!(user_id: 6, question_id: 1, answer: false, pitch: "want it all" )

Room.create!(user_id: 1, recipient_id: 2)
Room.create!(user_id: 2, recipient_id: 1)


Message.create!(room_id: 1, message: [{mes: "message"}])
Message.create!(room_id: 2, message: "hello cho")

puts "seeding done"