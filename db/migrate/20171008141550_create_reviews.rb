class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :comment
      t.integer :user_id
      t.integer :hotel_id
      t.integer :rate
      t.timestamps
    end
  end
end
