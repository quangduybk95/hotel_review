class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  UPDATE_PARAMS = [profile_attributes: [:name, :address,
                                        :gender, :phonenumber, :birthday, :avatar, :description]].freeze
  REGISTRATION_PARAMS = [:email, :password, :password_confirmation,
                         :provider, :uid].freeze
  acts_as_token_authenticatable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, presence: true, length: {maximum: 50},
            format: {with: VALID_EMAIL_REGEX}, uniqueness: {case_sensitive: false}
  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile, update_only: true
  has_many :hotels
  has_many :reviews
end
