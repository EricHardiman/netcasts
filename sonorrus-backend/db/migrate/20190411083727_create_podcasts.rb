class CreatePodcasts < ActiveRecord::Migration[5.2]
  def change
    create_table :podcasts do |t|
      t.string :title
      t.string :copyright
      t.string :description
      t.string :docs
      t.string :feed_url
      t.string :image_url
      t.string :itunes_author
      t.string :itunes_explicit
      t.string :language
      t.datetime :pubdate

      t.timestamps
    end
  end
end
