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
        end
      end
      resources :users
      resources :categories, except: [:destroy]
      
    end
  end
  

end
