class RemoveColumnFromEpisodes < ActiveRecord::Migration[5.2]
  def change
    remove_column :episodes, :itunes_duration, :string
    remove_column :episodes, :itunes_explicit, :string
  end
end
