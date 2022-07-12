class MessagesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :create]
    def index
        messages = Message.all
        render json: messages, status: :ok
    end

    def create
      
        message = Message.create!(message_params)
        render json: message, status: :created
    end
private

def message_params
    params.permit(:room_id, :message)
    end
end
