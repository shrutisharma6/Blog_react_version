require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  before do
    @user = User.create(username: "johndoe", email: "johndoe@example.com",
                            password: "password", admin: false)
    allow(controller).to receive(:current_user).and_return(@user)
end

  describe "POST #create" do
    context "with valid credentials" do
      it "logs in the user" do
        post :create, params: {session: { email: @user.email, password: "password" }}
        expect(response).to redirect_to(articles_url)
        expect(session[:user_id]).to eq(@user.id)
      end
    end
    
    context "with invalid credentials" do
      it "gives the login page" do
        post :create, params: {session: { email: @user.email, password: "wrong_password" }}
        expect(response).to render_template(:new)
        expect(session[:user_id]).to be_nil
      end
    end
  end

  describe "DELETE #destroy" do
    it "logs out the user" do
      session[:user_id] = @user.id
      delete :destroy
      expect(response).to redirect_to(root_path)
      expect(session[:user_id]).to be_nil
    end
  end
end
