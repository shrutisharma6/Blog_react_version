class ArticleCategorySerializer
  include JSONAPI::Serializer
  attributes :id
  belongs_to :article
  belongs_to :category
end
