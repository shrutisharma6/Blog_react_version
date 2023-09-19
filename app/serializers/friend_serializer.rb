class FriendSerializer
    include JSONAPI::Serializer
    attributes :username, :email, :admin 
  end
  