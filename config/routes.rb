Rails.application.routes.draw do
  devise_for :users, controllers: {
        sessions: 'api/v1/sessions'
      }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'articles#home'
  resources:articles
  get 'signup', to: 'users#new'
  resources :users, except: [:new]
  get 'login', to: 'sessions#new'
  post 'login' , to: 'sessions#create'
  delete 'logout' , to: 'sessions#destroy'
  resources :categories, except: [:destroy]
  
  namespace :api do
    namespace :v1 do
      
      devise_scope :user do
        get '/login', to: 'sessions#new'
        post '/login', to: 'sessions#create'
        delete '/logout', to: 'sessions#destroy'
        get '/signup', to: 'users#new'
      end
      # resources :articles
      resources :articles do
        member do
          post 'like', to: 'articles#like'
          get 'comment', to: 'articles#show_comment'
          post 'comment', to: 'articles#comment'
        end
      end
      resources :users do
        member do
          get '/friends', to: 'users#show_friends'
          post 'friend_requests/send/:friend_id', to: 'friend_requests#send_friend_request'
          delete 'friend_requests/reject', to: 'friend_requests#reject_friend_request'
          get 'friend_requests/received', to: 'friend_requests#received_friend_requests'
          get 'friend_requests/sent', to: 'friend_requests#sent_friend_requests'
          
        end
        resources :friendships, only: [:create, :destroy] 
        resources :messages
      end
      resources :categories, except: [:destroy]
      
    end
  end
  

end



