class ChangeUserIdToBeBigintInChatRooms < ActiveRecord::Migration[7.0]
  def up
    change_column :chat_rooms, :user_id, :bigint
  end

  def down
    change_column :chat_rooms, :user_id, :integer
  end
end
