class CreateUserAds < ActiveRecord::Migration[5.2]
  def change
    create_table :user_ads do |t|
      t.references :user, foreign_key: true
      t.references :ad, foreign_key: true

      t.timestamps
    end
  end
end
