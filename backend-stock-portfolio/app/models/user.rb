class User < ApplicationRecord
    has_many :transactions
    has_secure_password

    def encode_token
        payload = {email: email}
        JWT.encode(payload, 'cdiep')
    end

    def portfolio
        portfolio_hash = {}
        transactions.each do |transaction|
            if !!portfolio_hash[transaction[:ticker]]
                portfolio_hash[transaction[:ticker]] += transaction[:quantity]
            else
                portfolio_hash[transaction[:ticker]] = transaction[:quantity]
            end
        end

        portfolio = []
        portfolio_hash.each do |tick, qty|
            stock = {}
            stock[tick] = qty
            portfolio.push(stock)
        end
        portfolio
    end
end
