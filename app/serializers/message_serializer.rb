class MessageSerializer
    include JSONAPI::Serializer
    attributes :id, :sender_id, :sender, :receiver, :receiver_id, :seen, :content
  end