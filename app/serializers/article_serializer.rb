class ArticleSerializer
  include JSONAPI::Serializer
  attributes :title, :description, :likes
  belongs_to :user
  has_many :comments
  has_many :article_categories
  has_many :categories, through: :article_categories
end
