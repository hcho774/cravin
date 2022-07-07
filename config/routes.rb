Rails.application.routes.draw do
  
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :answers
 
  resources :questions
  # Defines the root path route ("/")
  # root "articles#index"
  get '/users', to: "users#index"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
 
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
