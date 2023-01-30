class MessagesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :entity_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response


    def index
        messages = Message.all
        render json: messages, status: :ok 
    end 

    def show 
        message = Message.find(params[:id])
        render json: message, serializer: MessageSerializer, status: :ok
    end 

    def create
        message = Message.create!(message_params)
        if message 
            chatroom = message.chat_room
            message.user = current_user
            broadcast chatroom
        end
        render json: message,   status: :accepted
    end 

    def destroy
        message = Message.find(params[:id])
        message.destroy
        #     chatroom = message.chat_room
        #     broadcast chatroom
        # end 
        head :no_content
    end


    private 

    def message_params
        params.permit(:content, :user_id, :chat_room_id)
    end 

    def entity_not_found_response
        render json: { "error": "Message not found." }, status: :not_found
    end

    def unprocessable_entity_response exception
        render json: { "errors": exception.record.errors.full_messages },status: :unprocessable_entity
    end

    def broadcast(chatroom)
        ChatRoomChannel.broadcast_to(chatroom, {chatroom: chatroom, users: chatroom.users, messages: chatroom.messages})
    end 
end
