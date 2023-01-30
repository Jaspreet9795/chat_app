class ChatRoom < ApplicationRecord

    has_many :messages,  dependent: :delete_all
    # has_many :users, through: :messages
    has_many :chat_users, dependent: :delete_all
    has_many :users, through: :chat_users 
    belongs_to :user
end
