require 'rails_helper'

RSpec.describe User, type: :model do

    describe "validations" do
        context "when username is not given" do
            it "should not be valid" do
                user = User.new(email: "john@mail.com", password: "password")
                expect(user).not_to be_valid
            end
        end
        context "when email is not given" do
            it "should not be valid" do
                user= User.new(username: "john doe", password: "password")
                expect(user).not_to be_valid
            end
        end
        context "when email is of invalid format" do
            it "should not be valid" do
                user= User.new(username: "john doe", email: "wrong mail", password: "password")
                expect(user).not_to be_valid
            end
        end
        context "when username is too short" do
            it "should not be valid" do
                user= User.new(username: "x", email: "john@mail.com", password: "password")
                expect(user).not_to be_valid
            end
        end
        context "when username is not unique" do
            it "should not be valid" do
                user= User.new(username: "john doe", email: "john@mail.com", password: "password")
                user.save
                user2= User.new(username: "john doe", email: "jane@mail.com", password: "password")
                expect(user2).not_to be_valid
            end
        end
        context "when email is not unique" do
            it "should not be valid" do
                user= User.new(username: "john doe", email: "john@mail.com", password: "password")
                user.save
                user2= User.new(username: "jane doe", email: "john@mail.com", password: "password")
                expect(user2).not_to be_valid 
            end
        end
        context "when every field is valid and unique" do
            it "should be valid" do
                user= User.new(username: "john doe", email: "john@mail.com", password: "password")
                expect(user).to be_valid
            end
        end
        context "when password is not given" do
            it "should not be valid" do
                user= User.new(username: "john doe", email: "john@mail.com")
                expect(user).not_to be_valid
            end
        end
    end

    describe "associations" do
        it "should have many articles" do
            article=Article.new(title: "title", description: "description")
            article2=Article.new(title: "title2", description: "description2")
            user= User.new(username: "name", email: "email@mail.com", password: "password")
            user.save
            article.user= user
            article2.user= user
            article.save
            article2.save
            expect(article.user).to eq(article2.user)
            expect(user.articles).not_to be_empty
        end
    end


end