class Comment < ApplicationRecord
    belongs_to :article
    belongs_to :user

    def self.ransackable_attributes(auth_object = nil)
        ["article_id", "body", "created_at", "id", "updated_at", "user_id"]
    end
end
