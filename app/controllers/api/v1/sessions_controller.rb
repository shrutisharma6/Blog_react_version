include Devise::Controllers::SignInOut
module Api
    module V1
        class SessionsController < Devise::SessionsController
             before_action :configure_sign_in_params, only: [:create]
            def create
                
                user = User.find_for_authentication(email: params[:user][:email])    
                
                 if user && user.valid_password?(params[:user][:password])       
                    sign_in(user)
                    render json: { token: user.authenticatable_salt, user_id: user.id } 
                   
                else      
                    render json: { error: 'Invalid email or password' }, status: :unauthorized    
                end
            end


            def destroy
                sign_out(current_user)
                render json: { message: 'Logged out successfully' }
            end
           

            private

            def configure_sign_in_params
                devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
            end
        end
    end
end
  