class UserSerializer
  include JSONAPI::Serializer
  attributes :username, :email, :password, :admin
  has_many :articles

  has_many :friendships
  has_many :friends, through: :friendships, serializer: FriendSerializer

end
