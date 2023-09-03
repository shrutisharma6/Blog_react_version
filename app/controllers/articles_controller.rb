class ArticlesController < ApplicationController
    before_action :set_article, only: [:show, :edit, :update, :destroy]
    before_action :article_params, only: [:create, :update]
    before_action :require_user, only: [:new, :edit, :create, :update, :destroy]
    before_action :require_same_user, only: [:edit, :update, :destroy]

    def show
       
    end

    def index
        @articles = Article.paginate(page: params[:page], per_page: 8)
    end

    def new
        @article=Article.new
    end

    def edit
        
    end

    def create
        @article = Article.new(article_params)
        @article.user = current_user
        if @article.save
            flash[:notice] = "Article was created successfully."
            redirect_to articles_url
        else
            render 'new'
        end
    end

    def update
        if @article.update(article_params)
            flash[:notice]= "Article was updated successfully."
            redirect_to articles_url
        else
            render 'edit'
        end

    end

    def destroy
        
        @article.destroy
        flash[:notice]= "Article was deleted successfully."
        redirect_to articles_url
    end

    private
        def set_article
            @article=Article.find(params[:id])
        end

        def article_params
            params.require(:article).permit(:title, :description, category_ids: [])
            
        end

        def require_same_user
            if @article && current_user!= @article.user && !current_user.admin?
                flash[:alert]="You can only edit or delete your own articles"
                redirect_to @article
            end
        end

end

