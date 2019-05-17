class CreateAds < ActiveRecord::Migration[5.2]
  def change
    create_table :ads do |t|
      t.integer :start_time
      t.integer :stop_time
      t.string :text
      t.string :company
      t.string :company_url
      t.string :promo_code
      t.references :episode, foreign_key: true

      t.timestamps
    end
  end
end
