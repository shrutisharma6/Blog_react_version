module Api
    module V1
        class ArticlesController < ApplicationController
            before_action :set_article, only: [:show, :edit, :update, :destroy, :like, :comment, :show_comment]
            before_action :article_params, only: [:create, :update]
            before_action :authenticate_user_custom, except: [:index, :show, :show_comment]
            def comment
                @comment= @article.comments.create(params.require(:comment).permit(:body))
                @comment.user= @current_user
                if @comment.save
                    render json: {message: "Comment created"}
                else 
                    render json: {error: "Not created "}
                end
            end
            def show_comment
                @comments= @article.comments
                render json: CommentSerializer.new(@comments).serializable_hash
            end
        
            def show
                render json: ArticleSerializer.new(@article, include: [:user, :categories, :comments]).serializable_hash

            end
        
            def index
                @articles = Article.all
                render json: ArticleSerializer.new(@articles).serializable_hash

            end
        
            def new
                @article=Article.new
            end
        
            def edit
                render json: ArticleSerializer.new(@article).serializable_hash
            end
        
            def create
                @article = Article.new(article_params)
                @article.user = @current_user
                if @article.save
                    render json: ArticleSerializer.new(@article).serializable_hash

                else
                    render json: {errors: @article.errors.messages}, status: 422
                end
            end
        
            def update
                if @article.update(article_params)
                    render json: ArticleSerializer.new(@article).serializable_hash
                else
                    render json: {error: @article.error.messages}, status: 422
                end
        
            end
        
            def destroy
                
                if @article.destroy
                    head :no_content
                else 
                    render json: {error: @article.error.messages}, status: 422
                end
                
            end

             # def like
            #     @article.increment!(:likes)
            #     render json: ArticleSerializer.new(@articles).serializable_hash
            # end
           
            private
                def set_article
                    @article=Article.find(params[:id])
                end
        
                def article_params
                      params.require(:article).permit(:title, :description, category_ids: [])
                    
                end
                
        end
    end
end


