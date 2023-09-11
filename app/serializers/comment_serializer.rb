class CommentSerializer
    include JSONAPI::Serializer
    attributes :body
    belongs_to :user
    belongs_to :article
  end