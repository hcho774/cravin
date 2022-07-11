class QuestionsController < ApplicationController
    skip_before_action :authorize, only: :index
    def index
        questions = Question.all
        render json: questions, status: :ok
    end 
end
