class ChangeStartStopTimeToDatetime < ActiveRecord::Migration[5.2]
  def change
    change_column :ads, :start_time, :string
    change_column :ads, :stop_time, :string
  end
end
