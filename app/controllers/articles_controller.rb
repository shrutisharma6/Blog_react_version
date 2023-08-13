class ArticlesController < ApplicationController
    before_action :set_article, only: [:show, :edit, :update, :destroy]
    before_action :article_params, only: [:create, :update]
    def show
        
    end

    def index
        @articles = Articles.paginate(page: params[:page], per_page: 8)
    end

    def new
        @article=Articles.new
    end

    def edit
        
    end

    def create
        @article=Articles.new(article_params)
        @article.user= User.first
        if @article.save
            flash[:notice]= "Article was created successfully."
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
            @article=Articles.find(params[:id])
        end

        def article_params
            params.require(:articles).permit(:title, :description)
        end

end
