class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    skip_before_action :verify_authenticity_token
    
    def authenticate_user_custom
        token = params[:headers][:Authorization]&.split('Bearer')&.last
        user_id = params[:user]["user_id"]
        auth_token= " " + User.find(user_id).authenticatable_salt
        if token.present? && token == auth_token
         @current_user = User.find(user_id)
         current_user= @current_user
         if @current_user.nil?
            render json: { error: 'Invalid token or user not found' }, status: :unauthorized
         end
        else
          render json: { error: 'Authorization token missing' }, status: :unauthorized
        end
    end


    def authenticate_user_can_can
        token = params[:headers][:Authorization]&.split('Bearer')&.last
        user_id = params["user_id"]
        auth_token= " " + User.find(user_id).authenticatable_salt
        if token.present? && token == auth_token
         @current_user = User.find(user_id)
         current_user= @current_user
         if @current_user.nil?
            render json: { error: 'Invalid token or user not found' }, status: :unauthorized
         end
        else
          render json: { error: 'Authorization token missing' }, status: :unauthorized
        end
    end

    def current_abilty
      @current_ability= Ability.new(@current_user)
    end
end
