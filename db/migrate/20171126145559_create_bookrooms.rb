class CreateBookrooms < ActiveRecord::Migration[5.1]
  def change
    create_table :bookrooms do |t|
      t.integer :user_id
      t.integer :hotel_id
      t.date :start
      t.date :end
      t.timestamps
    end
  end
end
