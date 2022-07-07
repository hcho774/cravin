class User < ApplicationRecord
    has_secure_password

    has_many :messages
    has_many :rooms, through: :messages

    validates :username, presence: true, uniqueness: true

end

