Rails.application.routes.draw do
 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :answers
  resources :rooms
  resources :questions
  resources :messages

  get "/check_recipient/:id", to: "rooms#check_recipient"
  delete "/deleterooms/", to: "rooms#deleterooms"
  get "/users/", to: "users#index"
  patch "/resetmatches/", to: "users#resetmatches"

  get '/man/', to: "users#man"
  get '/woman/', to: "users#woman"
  get "/matcheduser/:id", to: "users#matcheduser"
  patch '/users/:id', to: "users#update"
  patch "/matches/:id", to: "users#matches"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
 end
 