class FriendshipSerializer
    include JSONAPI::Serializer
    belongs_to :user
    belongs_to :friend, class_name: "User"
end
