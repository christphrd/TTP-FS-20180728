class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def create
    @user = User.new(user_params)

    if @user.save
      render json: {status: 201, message: "Successfully created.", user: { email: @user.email, name: @user.name, account_balance: @user.account_balance}, token: @user.encode_token }
    else
      render json: {errors: @user.errors.full_messages }
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
