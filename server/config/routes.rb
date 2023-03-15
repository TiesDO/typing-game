Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/user', to: "users#index"
  get '/user/:id', to: 'users#show'
  post '/account/login', to: 'users#login'
  post '/account/register', to: 'users#create'
  
  get '/result/:id', to: 'results#index'
  get '/leaderboard', to: 'results#leaderboard'
  post '/result', to: 'results#create'

end
