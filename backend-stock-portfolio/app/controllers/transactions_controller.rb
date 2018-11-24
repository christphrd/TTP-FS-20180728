class TransactionsController < ApplicationController
    def create
        @transaction = Transaction.new(ticker: transaction_params[:ticker], quantity: transaction_params[:quantity], price: transaction_params[:price], user_id: current_user.id)

        if @transaction.save
            render json: @transaction, status: 201
        else
            render json: {errors: @transaction.errors.full_messages }
        end
    end

    private

    def transaction_params
        params.permit(:ticker, :quantity, :price)
    end
end
