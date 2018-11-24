class User < ApplicationRecord
    has_secure_password

    def encode_token
        payload = {id: id, email: email}
        JWT.encode(payload, 'cdiep')
    end
end
