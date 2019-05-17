Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create]
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#get_user'
      get '/podcasts/:id/episodes', to: 'podcasts#episodes', as: 'podcast_episodes'
      get '/podcasts/:id/all_episodes', to: 'podcasts#all_episodes', as: 'podcast_all_episodes'
      get '/podcasts/photos', to: 'podcasts#photos', as: 'podcast_photos'
      resources :podcast_categories
      resources :categories
      resources :user_clips
      resources :ads
      resources :clips
      resources :comments
      resources :user_ads
      resources :user_podcasts
      resources :episodes
      resources :podcasts
    end
  end
end
