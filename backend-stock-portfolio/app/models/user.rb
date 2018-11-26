class User < ApplicationRecord
    has_many :transactions
    has_secure_password

    def encode_token
        payload = {email: email}
        JWT.encode(payload, 'cdiep')
    end

    def portfolio
        portfolio = {}
        transactions.each do |transaction|
            if !!portfolio[transaction[:ticker]]
                portfolio[transaction[:ticker]] += transaction[:quantity]
            else
                portfolio[transaction[:ticker]] = transaction[:quantity]
            end
        end
        portfolio
    end
end
