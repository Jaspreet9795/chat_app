class CreateChatUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :chat_users do |t|
      t.belongs_to :chat_room
      t.belongs_to :user
      t.timestamps
    end
  end
end
