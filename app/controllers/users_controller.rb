class UsersController < ApplicationController
  skip_before_action :authorize, only: [:index, :create, :update]
  rescue_from ActiveRecord::RecordInvalid, with: :invalid
 
  def index
   user = User.all
   render json: user, status: :ok
 
  end
 
  def matcheduser
   user = User.find(params[:id])
   render json: user, status: :ok
  end
 
 
  def woman
   users = User.where(gender_identity: "woman")
   render json: users, status: :ok
 end
 
 def man
   users = User.where(gender_identity: "man")
   render json: users, status: :ok
 end
 
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end
 
  def update
   user = User.find(params[:id])
   user.update!(profile_params)
   render json: user, status: :ok
 end
 
 def matches
   # binding.break
 
   user = User.find(params[:id])
   user.update!(matches: params[:matches])
   render json: user, status: :ok
 end
  def show
    render json: @current_user
  end
 
 
  private
  def user_params
    params.permit(:username, :password )
  end
  def profile_params
   params.permit(:username, :first_name, :dob_day, :dob_month, :dob_year, :show_gender, :gender_identity, :gender_interest,:img,:matches )
 end
 
 
 
  def invalid
    render json: {errors: ["Username has been taken, Please try other username "]}, status: :unprocessable_entity
end
 
end
