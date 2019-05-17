class RemoveColumnFromPodcasts < ActiveRecord::Migration[5.2]
  def change
    remove_column :podcasts, :itunes_author, :string
    remove_column :podcasts, :itunes_explicit, :string
    remove_column :podcasts, :pubdate, :datetime
  end
end
