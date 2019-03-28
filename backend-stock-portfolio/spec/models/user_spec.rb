require 'rails_helper'

RSpec.describe User, type: :model do
  context "validation tests" do
    User.destroy_all

    it "ensures name presence" do
      user = User.new(email: "test@test.com", password: "test", password_confirmation: "test").save
      expect(user).to eq(false)
    end

    it "ensures email presence" do
      user = User.new(name: "test", password: "test", password_confirmation: "test").save
      expect(user).to eq(false)
    end

    it "ensures password presence" do
      user = User.new(name: "test", email: "test").save
      expect(user).to eq(false)
    end
  end
  
  context "user story tests" do
    User.destroy_all

    user = User.create(
      name: "test",
      email: "test@test.com",
      password: "test",
      password_confirmation: "test"
    )
    
    it "can be created with name, email, and password" do
      expect(user).to be_valid
    end

    it "has a default account balance of $5000" do
      expect(user.account_balance).to eq(5000)
    end

    it "can only be registered once with a given email" do
      user2 = User.new(
        name: "test",
        email: "test@test.com",
        password: "test",
        password_confirmation: "test"
      )
      expect(user2).to be_invalid
    end
  end
end
