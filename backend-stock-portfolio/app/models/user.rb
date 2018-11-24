class User < ApplicationRecord
    has_secure_password

    def encode_token
        payload = {email: email}
        JWT.encode(payload, 'cdiep')
    end
end
