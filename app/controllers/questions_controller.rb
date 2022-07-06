class QuestionsController < ApplicationController

    def index
        questions = Question.all
        render json: questions, status: :okay
    end 
end
