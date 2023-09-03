module Api 
    module V1 
        class CategoriesController < ApplicationController
            #  before_action :require_admin,except: [:index, :show]
            
            def new
                @category=Category.new
            end
        
            def create
                @category=Category.new(category_params)
                if @category.save
                    render json: CategorySerializer.new(@category).serializable_hash

                else
                    render json: {error: @category.error.messages}, status: 422
                end
            end
        
            def index
                @categories= Category.all
                render json: CategorySerializer.new(@categories).serializable_hash
            end
        
            def show
                @category= Category.find(params[:id])
                render json: CategorySerializer.new(@category, include: [:articles]).serializable_hash
            end
        
            # def edit
            #     @category= Category.find(params[:id])
            # end
            # def update
            #     @category= Category.find(params[:id])
            #     if @category.update(category_params)
            #         flash[:notice]= "Category was updated successfully."
            #         redirect_to @category
            #     else
            #         render 'edit'
            #     end
        
            # end
        
            private
                def category_params
                    params.require(:category).permit(:name)
                end
                # def require_admin
                #     if !(logged_in? && current_user.admin?)
                #         flash[:alert]="Only admins can create or edit categories"
                #         redirect_to categories_url
                #     end
                # end
        end
    end
end