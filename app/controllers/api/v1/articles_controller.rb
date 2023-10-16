module Api
    module V1
        class ArticlesController < ApplicationController
            before_action :set_article, only: [:show, :edit, :update, :destroy, :likes_count, :create_like, :destroy_like, :comment, :show_comment]
            before_action :article_params, only: [:create, :update]
            before_action :authenticate_user_custom, except: [:index, :show, :show_comment, :likes_count, :destroy]
            before_action :authenticate_user_can_can, only: [:show, :index]
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
                if can? :read, @article
                    render json: ArticleSerializer.new(@article, include: [:user, :categories, :comments]).serializable_hash
                else
                    render json: {message: "Only friends can view the article"}
                end
            end
        
            def index
                @articles = Article.accessible_by(current_ability)
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
                @article.user =@current_user
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
                    render json: {error: @article.errors.messages}, status: 422
                end
        
            end
        
            def destroy
                if @article.destroy
                    head :no_content
                else 
                    render json: {error: @article.errors.messages}, status: 422
                end
                
            end

            def likes_count
                likes_count = @article.likes.count
                render json: { likes_count: likes_count }
            end

            def create_like
                like= Like.new( article_id:@article.id, user_id: @current_user.id)
                like.save
            end
        
            def destroy_like
                @like = @current_user.likes.find_by(article_id: params[:id])
                @like.destroy
                @article = Article.find(params[:id])
                @article.update(likes_count: @article.likes.count)
            end
           
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


