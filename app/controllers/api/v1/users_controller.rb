module Api
    module V1
        class UsersController < ApplicationController
            before_action :set_user, only: [:show, :edit, :update, :destroy, :show_friends]
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
                    @user.send_confirmation_instructions
                    render json: {message:'Confirmation mail sent'}
                else
                    render json: {error: @user.errors.messages}, status: 422
                end
            end
        
            def destroy
                @user.destroy
                head :no_content
            end

            def show_friends
                @friends = @user.friends
                render json: FriendSerializer.new(@friends).serializable_hash
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


