class CreateHotels < ActiveRecord::Migration[5.1]
  def change
    create_table :hotels do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :link
      t.string :image
      t.integer :stars
      t.integer :cost
      t.float :latitude, limit: 30
      t.float :longitude, limit: 30
      t.integer :user_id
      t.string :description
      t.timestamps
    end
  end
end
