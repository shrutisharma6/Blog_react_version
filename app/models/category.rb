class Category < ApplicationRecord
    validates :name , presence: true, length: { minimum: 3, maximum: 25}
    validates_uniqueness_of :name
    has_many :article_categories
    has_many :articles, through: :article_categories

    def self.ransackable_attributes(auth_object = nil)
        ["created_at", "id", "name", "updated_at"]
    end

    def self.ransackable_associations(auth_object = nil)
        ["article_categories", "articles"]
    end
end