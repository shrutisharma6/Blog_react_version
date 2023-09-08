class ApplicationController < ActionController::Base
    
    protect_from_forgery with: :exception
    skip_before_action :verify_authenticity_token
    def authenticate_user_custom
        token = params[:headers][:Authorization]&.split('Bearer')&.last
        user_id = params[:user]["user_id"]
        auth_token= " " + User.find(user_id).authenticatable_salt
        if token.present? && token == auth_token
         @current_user = User.find(user_id)
         if @current_user.nil?
            render json: { error: 'Invalid token or user not found' }, status: :unauthorized
        end
        else
          render json: { error: 'Authorization token missing' }, status: :unauthorized
        end
    end

end
