class ChatRoomSerializer < ActiveModel::Serializer
  attributes :id,  :title , :user_id
  has_many :messages

  has_many :chat_users
  # has_many :users, through: :messages
end
