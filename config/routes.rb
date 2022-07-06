Rails.application.routes.draw do
  
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :answers

  resources :questions
  # Defines the root path route ("/")
  # root "articles#index"
  # get '/users', to: "users#index"
 
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
