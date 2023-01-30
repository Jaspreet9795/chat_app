

class ChatRoomChannel < ApplicationCable::Channel
 
  def subscribed
    stop_all_streams
   chat_room= ChatRoom.find(params[:id])
   stream_for chat_room
  end

  def received(data)
    ChatRoomChannel.broadcast_to(chat_room, {chat_room: chat_room, users: chat_room.users, messages: chat_room.messages} )

  end

  def unsubscribed
    stop_all_streams
  end
end
