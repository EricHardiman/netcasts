class CreateClips < ActiveRecord::Migration[5.2]
  def change
    create_table :clips do |t|
      t.integer :start_time
      t.integer :stop_time
      t.references :episode, foreign_key: true

      t.timestamps
    end
  end
end
