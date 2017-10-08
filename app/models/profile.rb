class Profile < ApplicationRecord
  enum gender: [:male, :female, :undefined]

  mount_base64_uploader :avatar, ImageUploader

  belongs_to :user
end
