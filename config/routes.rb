Rails.application.routes.draw do
  resources :chat_users
  resources :messages
  resources :chat_rooms
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # get '/hello', to: 'application#hello_world'

  post "/login", to: "sessions#create"
  get "/authorised_user", to: "users#show"
  delete "/logout", to: "sessions#delete"


  get "/teachers", to: "users#teachers"
  get "/students", to: "users#students"
  get "/filter_chat_rooms", to:"chat_rooms#filter_chat_rooms"
  get "/message_users/:id", to:"users#message_user"


  mount ActionCable.server => "/cable"
end
