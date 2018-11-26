Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post "/register", to: "users#create"
  get "/portfolio", to: "users#portfolio"

  post "/signin", to: "auth#create"
  get "/current_user", to: "auth#show"

  resources :transactions, only: [:create]
  get "/audit", to: "transactions#index"
end
