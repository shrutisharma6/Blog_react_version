class UserSerializer
  include JSONAPI::Serializer
  attributes :username, :email, :password
  has_many :articles
end
