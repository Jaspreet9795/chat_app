class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :chat_room_id
  has_one :user
end
