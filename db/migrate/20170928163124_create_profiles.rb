class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.string :name
      t.datetime :birthday
      t.string :phonenumber
      t.integer :gender, default: 0
      t.string :avatar
      t.text :description

      t.timestamps
    end
  end
end
