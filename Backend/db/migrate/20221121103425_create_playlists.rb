class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists do |t|
      t.string :name
      t.boolean :visible, default: true
      t.timestamps
    end
  end
end
