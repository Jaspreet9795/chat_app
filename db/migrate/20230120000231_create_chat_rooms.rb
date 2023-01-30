class CreateChatRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :chat_rooms do |t|
      t.string :title
      t.string :creator

      t.timestamps
    end
  end
end
