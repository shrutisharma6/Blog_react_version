require 'rails_helper'

RSpec.describe Article, type: :model do
    before do
        @user= User.new(username: "name", email: "mail@email.com", password:"password")
    end
    describe "validations" do
        context "when title and description given" do
            it "should not be valid" do
                article=Article.new(title: "title", description: "description")
                article.user=@user
                article.save
                expect(article).to be_valid
            end
        end
        context "when title is not given" do
            it "should not be valid" do
                article=Article.new(description: "description")
                article.user=@user
                article.save
                expect(article).not_to be_valid
            end
        end
        context "when description is not given" do
            it "should not be valid" do
                article=Article.new(title: "title")
                article.user=@user
                article.save
                expect(article).not_to be_valid
            end
        end
        context "when description is to short" do
            it "should not be valid" do
                article=Article.new(title: "title", description: "a")
                article.user=@user
                article.save
                expect(article).not_to be_valid
            end
        end
    end

    describe "associations" do
        it "should have many articles" do
            article=Article.new(title: "title", description: "description")
            article2=Article.new(title: "title2", description: "description2")
            category= Category.new(name: "Health")
            category2= Category.new(name: "Food")
            category.save
            article.categories<< category
            article2.categories<< category
            article.categories<< category2
            article2.categories<< category2
            article.save
            article2.save
            expect(article.categories).to eq(article2.categories)
            expect(article.categories).not_to be be_empty
        end
        it "should have a user" do
            article=Article.new(title: "title", description: "description")
            user= User.new(username: "name", email: "email@mail.com", password: "password")
            user.save
            article.user= user
            article.save
            expect(article.user).to eq(user)
        end
    end
end