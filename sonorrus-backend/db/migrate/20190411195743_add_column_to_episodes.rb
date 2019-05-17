class AddColumnToEpisodes < ActiveRecord::Migration[5.2]
  def change
    add_column :episodes, :duration, :integer
    add_column :episodes, :explicit, :string
  end
end
