class ChatUsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :entity_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response


    def index
        chat_users=ChatUser.all
        render json: chat_users
    end 

    def create
        puts ("Checking chat_user : #{params}")
        params[:user_id].each do |single_user_id|
            ChatUser.create(user_id: single_user_id, chat_room_id: params[:chat_room_id])
        end
        render json: { "status": "created" }, status: :ok
    end 


    def destroy
        chat_user = ChatUser.find(params[:id])
        chat_user.destroy
        head :no_content

    end


private 

def chat_user_params
    params.permit(:user_id , :chat_room_id)
end

def entity_not_found_response
    render json: { "error": "Chat_User not found." }, status: :not_found
end

def unprocessable_entity_response exception
    render json: { "errors": exception.record.errors.full_messages },status: :unprocessable_entity
end

end