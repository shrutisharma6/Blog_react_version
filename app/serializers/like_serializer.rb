class LikeSerializer
    include JSONAPI::Serializer
    belongs_to :article
    belongs_to :user
end