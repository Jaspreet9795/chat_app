class User < ApplicationRecord
    has_secure_password

    has_many :messages
    # has_many :chat_rooms, through: :messages
    has_many :chat_users
    has_many :chat_rooms, through: :chat_users

end
