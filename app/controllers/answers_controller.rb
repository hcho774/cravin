class AnswersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :invalid
  skip_before_action :authorize, only: :index

    def index
        answers = Answer.all
        render json: answers, status: :ok
    end

    def create
        answer = Answer.create!(answer_params)
        render json: answer, status: :created

      end

      def update
   
        answer = Answer.find(params[:id])
        answer.update!(patch_params)
        newAnswers = Answer.all
        render json: newAnswers, status: :ok
    end


 def destroy
        answer = Answer.find(params[:id])
        answer.destroy
        head :no_content
      end

      private

      def invalid
        render json: {errors: ["Please select an answer and fill out the pitch!"]}, status: :unprocessable_entity
    end

    def patch_params
      params.permit(:answer, :pitch)
    end
    
      def answer_params
        params.permit(:user_id, :question_id, :answer, :pitch)
      end

end
