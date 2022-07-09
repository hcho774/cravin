class AnswersController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :invalid

    def index
        answers = Answer.all
        render json: answers, status: :ok
    end

    def create
        answer = Answer.create!(answer_params)
        render json: answer, status: :created

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

    
      def answer_params
        params.permit(:user_id, :question_id, :answer, :pitch)
      end

end
