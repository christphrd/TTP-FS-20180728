# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: "test", email: "test@test.com", password: "test", password_confirmation: "test")
User.create(name: "test2", email: "test2@test2.com", password: "test2", password_confirmation: "test2")