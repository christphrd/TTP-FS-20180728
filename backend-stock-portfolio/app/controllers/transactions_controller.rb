class TransactionsController < ApplicationController
    def create
        @transaction = Transaction.new(ticker: transaction_params[:ticker], quantity: transaction_params[:quantity], price: transaction_params[:price], user_id: current_user.id)

        new_balance = current_user.account_balance - (@transaction.quantity * @transaction.price)

        is_balance_calculated_accurately = new_balance.to_f == transaction_params[:account_balance].to_f

        if @transaction.save && is_balance_calculated_accurately
            current_user.update(account_balance: new_balance)
            render json: {transaction: @transaction, account_balance: current_user.account_balance}, status: 201
        elsif !is_balance_calculated_accurately
            render json: {errors: "Issue with account balance. Please refresh and try again."}, status: 400
        else
            render json: {errors: @transaction.errors.full_messages }, status: 400
        end
    end

    private

    def transaction_params
        params.permit(:ticker, :quantity, :price, :account_balance)
    end
end
