class ArticleCategory < ApplicationRecord
    belongs_to :article
    belongs_to :category

    def self.ransackable_attributes(auth_object = nil)
        ["article_id", "category_id", "created_at", "id", "updated_at"]
    end
end