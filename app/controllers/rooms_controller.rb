class RoomsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :invalid
    
    skip_before_action :authorize
    
def index
    room = Room.all
    render json: room, status: :ok
end

    def show
        room = Room.find_by(recipient_id: params[:recipient_id])
        render json: room, status: :ok
      end

    def create
        room = Room.create!(room_params)
        render json: room, status: :created
    end


    private

    def record_not_found
        render json: {error: "room not found"}, status: :not_found
    end

    def invalid
        render json: {errors: ["validation errors"]}, status: :unprocessable_entity
    end

    def room_params
    params.permit(:title, :sender_id, :recipient_id)
    end
end
