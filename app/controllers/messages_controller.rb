class MessagesController < ApplicationController
    skip_before_action :authorize, only: :index
    def index
        messages = Message.all
        render json: messages, status: :ok
    end
end
