require 'rails_helper'

RSpec.describe User, type: :model do
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
