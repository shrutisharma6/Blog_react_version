class UserSerializer
  include JSONAPI::Serializer
  attributes :username, :email, :password, :admin
  has_many :articles
end
