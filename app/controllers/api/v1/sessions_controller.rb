include Devise::Controllers::SignInOut

module Api
    module V1
        class SessionsController < Devise::SessionsController
            before_action :configure_sign_in_params, only: [:create]
            
            def create
                
                user = warden.authenticate(auth_options)
                if user
                    sign_in(user)
                    render json: { message: 'Logged in successfully ', user: user }
                else
                    render json: { error: 'Invalid email or password' }, status: :unprocessable_entity
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
  