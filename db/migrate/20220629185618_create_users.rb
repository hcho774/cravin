class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :first_name
      t.string :dob_day
      t.string :dob_month
      t.string :dob_year
      t.boolean :show_gender
      t.string :password_digest
      t.string :gender_identity
      t.string :gender_interest
      t.string :img
      t.integer :matches
      t.timestamps
    end
  end
end
