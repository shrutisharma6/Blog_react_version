module Api
    module V1
        class UsersController < ApplicationController
            before_action :set_user, only: [:show, :edit, :update, :destroy]
            # before_action :require_user, only: [:edit, :update]
            # before_action :require_same_user, only: [:edit, :update, :destroy]
            # skip_before_action :verify_authenticity_token
            def show
                
                render json: UserSerializer.new(@user, include: [:articles]).serializable_hash
            end
        
            def new
                @user =User.new
            end
            
            def index
                @users = User.all
                render json: UserSerializer.new(@users).serializable_hash
            end
            
            def edit 
                
            end
        
            def update
                if @user.update(user_params)
                    render json: UserSerializer.new(@user).serializable_hash
                else
                    render json: {error: @user.error.messages}, status: 422
                end
                
            end
        
            def create
                @user=User.new(user_params)
                
                if @user.save
                    sign_in(@user)
                    render json: { token: @user.authenticatable_salt, user_id: @user.id }
                else
                    render json: {error: @user.errors.messages}, status: 422
                end
            end
        
            def destroy
                @user.destroy
                # session[:user_id] = nil if @user == current_user
                head :no_content
            end
        
            private
            def user_params
                params.require(:user).permit(:username, :email, :password)
            end
        
            def set_user
                @user=User.find(params[:id])
            end
        
            def require_same_user
                if current_user != @user && !current_user.admin?
                    flash[:alert]="You can only edit or delete your own account"
                    redirect_to root_path
                end
            end
        
        end
    end
end


