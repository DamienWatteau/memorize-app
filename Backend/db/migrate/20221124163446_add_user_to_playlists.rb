class AddUserToPlaylists < ActiveRecord::Migration[7.0]
  def change
    change_table :playlists do |t|
      t.belongs_to :user, index: true
    end
  end
end
