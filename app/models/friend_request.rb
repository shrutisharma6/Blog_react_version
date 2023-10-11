class FriendRequest < ApplicationRecord
    belongs_to :sent_to, class_name: 'User', foreign_key: 'sent_to_id'
    belongs_to :sent_by, class_name: 'User', foreign_key: 'sent_by_id'
    scope :friends, -> { where(status: true) }
    scope :not_friends, -> { where(status: false) }

    def self.ransackable_attributes(auth_object = nil)
        ["created_at", "id", "sent_by_id", "sent_to_id", "status", "updated_at"]
    end
end
