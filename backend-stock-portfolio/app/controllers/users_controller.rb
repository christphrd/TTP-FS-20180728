class UsersController < ApplicationController
    def create
        @user = User.new(user_params)

        if @user.save
          render json: @user
        else
          render json: { message: "#{@user.errors.messages.keys[0]} #{@user.errors[@user.errors.messages.keys[0]][0]}" }, status: @user.errors.status
        end
    end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
