Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post "/register", to: "users#create"
  post "/signin", to: "auth#create"
  get "/current_user", to: "auth#show"
end
