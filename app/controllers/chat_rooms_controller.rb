class ChatRoomsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :entity_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response



    def index 
        chat_rooms = ChatRoom.all
        render json: chat_rooms, status: :ok 
    end 


    def filter_chat_rooms
        chat_room = ChatRoom.joins("INNER JOIN chat_users on chat_rooms.id = chat_users.chat_room_id where chat_users.user_id = #{current_user.id}")
        render json: chat_room, status: :ok 
    end 

    def show 
        chat_room = ChatRoom.find(params[:id])
        render json: chat_room, serializer: ChatRoomSerializer,  status: :ok
    end 

    def create
        
        chat_room = ChatRoom.create!(title: params[:title],users: params[:users], user_id:  current_user.id)
        render json: chat_room, status: :accepted
    end 

    def destroy
        chat_room = ChatRoom.find(params[:id])
        chat_room.destroy
        head :no_content
    end


    private 

    def room_params
        params.permit(:title, users: [])
    end 

    def entity_not_found_response
        render json: { "error": "Room not found." }, status: :not_found
    end

    def unprocessable_entity_response exception
        render json: { "errors": exception.record.errors.full_messages },status: :unprocessable_entity
    end


end
