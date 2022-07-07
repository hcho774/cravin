class AnswersController < ApplicationController

    def index
        answers = Answer.all
        render json: answers, status: :ok
    end
end
