class RoomSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :recipient_id
  has_many :messages, :dependent => :destroy
 end
 