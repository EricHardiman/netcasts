class CreatePodcastCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :podcast_categories do |t|
      t.references :podcast, foreign_key: true
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
