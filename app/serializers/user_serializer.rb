class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name,:img,:matches, :gender_interest
  has_many :rooms
  has_one :answer
 end
 