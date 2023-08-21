require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  before do
    @user= User.create(username: "johndoe", email: "johndoe@example.com",
                        password: "password", admin: false)
    @user2= User.create(username: "user2", email: "user2@example.com",
                        password: "password2", admin: false)
    @admin_user= User.create(username: "admin", email: "admin@example.com",
                        password: "admin", admin: true)
  end

  describe "GET #show" do
    it "should get show template" do
      get :show, params: {id: @admin_user.id }
      get :show, params: {id: @user.id}
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #index" do
    it "should get index template" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #new" do
    it "should give new template" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    it "should create a new user" do
      expect {
      post :create, params: { user: { username: "jim", email: "jim@example.com", password: "jim123" } }
      }.to change(User, :count).by(1)
      expect(response).to redirect_to(articles_url)
    end
  end

  describe "GET #edit" do
      context "when user profile is of current user" do
          before do
              allow(controller).to receive(:current_user).and_return(@user)
          end
          it "gives edit template" do
              get :edit, params: { id: @user.id }
              expect(assigns(:user)).to eq(@user)
              expect(response).to render_template("edit")
          end
      end
      context "when user profile is not of current user" do
          before do
              @user2= User.create(username: "user2", email: "user2@example.com",
                                  password: "password2", admin: false)
              allow(controller).to receive(:current_user).and_return(@user2)
          end
          it "does not give edit template" do
              get :edit, params: { id: @user.id }
              expect(response).to redirect_to(root_path)
          end
       end
    end

    describe "PATCH #update" do
        before do
            allow(controller).to receive(:current_user).and_return(@user)
        end
        it "updates the user profile" do
            updated_name = "New Name"
            updated_email = "new@mail.com"
            
            patch :update, params: { id: @user.id, user: { username: updated_name, email: updated_email } }
            @user.reload
            expect(@user.username).to eq(updated_name)
            expect(@user.email).to eq(updated_email)
            expect(response).to redirect_to users_url
      end
    end

    describe "DELETE #delete" do
      context "when user profile is of current user" do
        before do
          allow(controller).to receive(:current_user).and_return(@user)
        end
        it "deletes profile" do
          expect {
          delete :destroy, params: { id: @user.id }
          }.to change(User, :count).by(-1)
          expect(response).to redirect_to(root_path)
        end
      end
      context "when user profile is of admin" do
        before do
          allow(controller).to receive(:current_user).and_return(@admin_user)
        end
        it "deletes profile" do
          expect {
          delete :destroy, params: { id: @user.id }
          }.to change(User, :count).by(-1)
          expect(response).to redirect_to(root_path)
        end
      end
      context "when user profile is not of current" do
        before do
          allow(controller).to receive(:current_user).and_return(@user2)
        end
        it "does not deletes profile" do
          expect {
          delete :destroy, params: { id: @user.id }
          }.not_to change(User, :count)
          expect(response).to redirect_to(root_path)
        end
      end
    end


end