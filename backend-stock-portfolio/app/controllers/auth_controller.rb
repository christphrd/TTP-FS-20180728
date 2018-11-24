class AuthController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create
        @user = User.find_by(email: user_params[:email]).try(:authenticate, user_params[:password])

        if @user
            render json: {status: 200, message: "OK", user: { email: @user.email, name: @user.name, account_balance: @user.account_balance}, token: @user.encode_token }
        else
            render json: {errors: @user.errors.full_messages }
        end
    end

    def show
        render json: {status: 200, message: "OK", user: { email: current_user.email, name: current_user.name, account_balance: current_user.account_balance}}
    end

    private

    def user_params
        params.permit(:email, :password)
    end
end
