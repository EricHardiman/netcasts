class CreateUserPodcast < ActiveRecord::Migration[5.2]
  def change
    create_table :user_podcast do |t|
      t.references :user, foreign_key: true
      t.references :podcast, foreign_key: true

      t.timestamps
    end
  end
end
