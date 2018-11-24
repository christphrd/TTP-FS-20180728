class ApplicationController < ActionController::API
    before_action :authorized
    
    def auth_header
        request.headers["Authorization"]
    end

    def decode_token
        if auth_header
            token = auth_header.split(" ")[1]
            begin
                JWT.decode(token, 'cdiep')
            rescue JWT::DecodeError
                [{}]
            end
        end
    end

    def current_user
        if decode_token
            user_email = decode_token[0]["email"]
            @user = User.find_by(email: user_email)
        end
    end

    def logged_in?
        !!current_user
    end

    def authorized
        render json: {status: 401, message: "Please log in"} unless logged_in?
    end
end
