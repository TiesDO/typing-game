# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

users = User.create([{ username: "Ties", password: "Test"}, { username: "Sam", password: "Test"}])
Result.create([{ wpm: 10, cpm: 15, user: users[0] },
             { wpm: 10, cpm: 16, user: users[0] },
             { wpm: 10, cpm: 17, user: users[0] },
             { wpm: 10, cpm: 18, user: users[1] }])
