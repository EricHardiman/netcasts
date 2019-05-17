class AddColumnToEpisode < ActiveRecord::Migration[5.2]
  def change
    add_column :episodes, :guid, :string
  end
end
