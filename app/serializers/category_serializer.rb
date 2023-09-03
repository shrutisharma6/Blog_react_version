
class CategorySerializer
  include JSONAPI::Serializer
  attributes :name
  has_many :article_categories
  has_many :articles, through: :article_categories
end

