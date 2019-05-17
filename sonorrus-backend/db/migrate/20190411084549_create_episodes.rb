class CreateEpisodes < ActiveRecord::Migration[5.2]
  def change
    create_table :episodes do |t|
      t.string :title
      t.text :content
      t.integer :enclosure_length
      t.string :enclosure_type
      t.string :enclosure_url
      t.string :itunes_duration
      t.string :itunes_explicit
      t.datetime :pubdate

      t.timestamps
    end
  end
end
