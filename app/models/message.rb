class Message < ApplicationRecord
    belongs_to :sender, class_name: "User"
    belongs_to :receiver, class_name: "User"

    def self.ransackable_attributes(auth_object = nil)
        ["content", "created_at", "id", "receiver_id", "seen", "sender_id", "updated_at"]
    end
end
