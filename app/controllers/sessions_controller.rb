class SessionsController < ApplicationController
    skip_before_action :authorised_user, only: [:create]
    
    def create
        user = User.find_by(email:params[:email])

        if user && user.authenticate(params[:password])
            session[:user_id]= user.id
            render json: user, status: :ok
        else 
            render json: {errors: "Invalid Password or User"}
        end 
    end 

    def delete
        session.delete :user_id
        head :no_content
    end 
end
