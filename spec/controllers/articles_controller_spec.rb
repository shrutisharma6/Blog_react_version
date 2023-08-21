require 'rails_helper'


RSpec.describe ArticlesController, type: :controller do

    before do
        @user = User.create(username: "johndoe", email: "johndoe@example.com",
                            password: "password", admin: false)
        @article = Article.create( title: "title", description: "descrption")
        @article.user = @user
        @article.save
        @admin_user= User.create(username: "admin", email: "admin@example.com",
                                password: "admin", admin: true)
        allow(controller).to receive(:current_user).and_return(@user)
    end
  
    describe "GET #index" do
        it "should get index" do
        get :index
        expect(response).to render_template("index")
        end
    end

    describe "GET #new" do
        it "should get new" do
            get :new
            expect(response).to have_http_status(:success)
        end
    end

    describe "POST #create" do
        it "creates a new article" do
            expect {
            post :create, params: { article: { title: "titless", description: "descriptionsss" } }
            }.to change(Article, :count).by(1)
            expect(response).to redirect_to(articles_url)
        end
    end

    describe "GET #show" do
        it "should show article" do
            get :show, params: {id: @article.id }
            expect(response).to have_http_status(:success)
        end
    end
    describe "GET #edit" do
      context "when article is of current user" do
          before do
              allow(controller).to receive(:current_user).and_return(@user)
          end
          it "gives edit template" do
              get :edit, params: { id: @article.id }
              expect(assigns(:article)).to eq(@article)
              expect(response).to render_template("edit")
          end
      end
      context "when article is not of current user" do
          before do
              @user2= User.create(username: "user2", email: "user2@example.com",
                                  password: "password2", admin: false)
              allow(controller).to receive(:current_user).and_return(@user2)
          end
          it "does not give edit template" do
              get :edit, params: { id: @article.id }
              expect(response).to redirect_to(@article)
          end
       end
     end

    describe "PATCH #update" do
        context "when the user is admin" do
            before do
                allow(controller).to receive(:current_user).and_return(@admin_user)
            end
            it "updates the article" do
                updated_title = "New title"
                updated_description = "new desc"
                
                patch :update, params: { id: @article.id, article: { title: updated_title, description: updated_description } }
                @article.reload
                expect(@article.title).to eq(updated_title)
                expect(@article.description).to eq(updated_description)
                expect(response).to redirect_to articles_url
            end
        end
        context "when the user is the article writer" do
            before do
                allow(controller).to receive(:current_user).and_return(@user)
            end
            it "updates the article" do
                updated_title = "New title"
                updated_description = "new desc"
                
                patch :update, params: { id: @article.id, article: { title: updated_title, description: updated_description } }
                @article.reload
                expect(@article.title).to eq(updated_title)
                expect(@article.description).to eq(updated_description)
                expect(response).to redirect_to articles_url
            end
        end

    end

    describe "DELETE #delete" do
      context "when article is of current user" do
        before do
          allow(controller).to receive(:current_user).and_return(@article.user)
        end
        it "deletes article" do
          expect {
          delete :destroy, params: { id: @article.id }
          }.to change(Article, :count).by(-1)
          expect(response).to redirect_to(articles_url)
        end
      end
      context "when user is admin" do
        before do
          allow(controller).to receive(:current_user).and_return(@admin_user)
        end
        it " deletes article" do
          expect {
          delete :destroy, params: { id: @article.id }
          }.to change(Article, :count).by(-1)
          expect(response).to redirect_to(articles_url)
        end
      end
      context "when article is not of current" do
        before do
          allow(controller).to receive(:current_user).and_return(@user2)
        end
        it "does not deletes article" do
          expect {
          delete :destroy, params: { id: @article.id }
          }.not_to change(Article, :count)
          expect(response).to redirect_to(login_path)
        end
      end
    end


end