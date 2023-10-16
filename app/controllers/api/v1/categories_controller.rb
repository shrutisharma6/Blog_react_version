module Api 
    module V1 
        class CategoriesController < ApplicationController    
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
        

            private
                def category_params
                    params.require(:category).permit(:name)
                end
        end
    end
end