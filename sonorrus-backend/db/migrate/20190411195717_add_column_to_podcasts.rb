class AddColumnToPodcasts < ActiveRecord::Migration[5.2]
  def change
    add_column :podcasts, :author, :string
    add_column :podcasts, :explicit, :string
  end
end
