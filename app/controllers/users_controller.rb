class UsersController < ApplicationController

rescue_from ActiveRecord::RecordNotFound, with: :entity_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response

skip_before_action :authorised_user, only: [:create]

def index 
    users = User.all
    render json: users, status: :ok
end 

def show 
    user = User.find_by(id: session[:user_id])
    render json: user,   status: :ok
    # if user
    #     render json: user
    #   else
    #     render json: { error: "Not authorized" }, status: :unauthorized
    #   end
end 

def message_user 
    user = User.find(params[:id])
    render json: user, status: :ok
end 

def create
    user= User.create!(user_params)
    render json: user, status: :accepted
end 

def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user, status: :accepted
end 

def destroy
    user= User.find(params[:id])
    user.destroy
    head :no_content
end 

def students
    students= User.where(role: "student")
    render json: students, status: :ok
end

def teachers
    teachers= User.where(role: "teacher")
    render json: teachers, status: :ok
end



private

def user_params
    params.permit( :name, :role, :email, :password)
end

def entity_not_found_response
    render json: { "error": "User not found." }, status: :not_found
end

def unprocessable_entity_response exception
    render json: { "errors": exception.record.errors.full_messages },status: :unprocessable_entity
end

end
