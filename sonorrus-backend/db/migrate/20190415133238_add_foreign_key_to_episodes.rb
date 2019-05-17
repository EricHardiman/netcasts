class AddForeignKeyToEpisodes < ActiveRecord::Migration[5.2]
  def change
    add_reference :episodes, :podcast, index: true
  end
end
