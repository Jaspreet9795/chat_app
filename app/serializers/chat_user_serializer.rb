class ChatUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :chat_room_id
end
