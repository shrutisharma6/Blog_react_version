require 'rails_helper'

RSpec.describe Category, type: :model do
    describe "validations" do
        context "when name is not given" do
            it "should not be valid" do
                category= Category.new(name: "")
                category.save
                expect(category).not_to be_valid
            end
        end
        context "when name is given" do
            it "should be valid" do
                category= Category.new(name: "Sports")
                category.save
                expect(category).to be_valid
            end
        end
        context "when name is too short" do
            it "should not be valid" do
                category= Category.new(name: "S")
                category.save
                expect(category).not_to be_valid
            end
        end
        context "when name is not unique" do
            it "should not be valid" do
                category= Category.new(name: "Sports")
                category2= Category.new(name: "Sports")
                category.save
                category2.save
                expect(category2).not_to be_valid
            end
        end

    end

    describe "associations" do
        it "should have many articles" do
            article=Article.new(title: "title", description: "description")
            article2=Article.new(title: "title2", description: "description2")
            user= User.new(username: "john doe", email: "john@mail.com", password: "password")
            user.save
            article.user = user
            article2.user = user
            category= Category.new(name: "Health")
            category2= Category.new(name: "Food")
            category.save
            category2.save
            article.categories<< category
            article2.categories<< category
            article.categories<< category2
            article2.categories<< category2
            article.save
            article2.save
            # expect(category.articles).to eq(category2.articles)
            expect(category.articles).not_to be be_empty
        end
    end
end