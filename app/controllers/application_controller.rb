class ApplicationController < ActionController::API
    include ActionController::Cookies
    
    rescue_from ActiveRecord::RecordNotFound, with: :entity_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_response
    
    
    private
    
    before_action :authorised_user

    def current_user
       user = User.find_by(id: session[:user_id])
       user
    end

    def authorised_user
        render json: {errors: "Not Authorised"}, status: :unauthorized unless current_user
    end

    def entity_not_found_response(error)
        render json: {errors: { error.model => "Not found" }}, status: :not_found
    end

    def unprocessable_entity_response exception
        render json: { "errors": exception.record.errors.full_messages }, status: :unprocessable_entity
    end
  
end
