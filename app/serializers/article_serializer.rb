class ArticleSerializer
  include JSONAPI::Serializer
  attributes :title, :description
  belongs_to :user
  has_many :comments
  has_many :likes
  has_many :article_categories
  has_many :categories, through: :article_categories
end
