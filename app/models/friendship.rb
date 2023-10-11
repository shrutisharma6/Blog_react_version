class Friendship < ApplicationRecord
    belongs_to :user
    belongs_to :friend, class_name: "User"

    def self.ransackable_attributes(auth_object = nil)
        ["created_at", "friend_id", "id", "updated_at", "user_id"]
    end
end
