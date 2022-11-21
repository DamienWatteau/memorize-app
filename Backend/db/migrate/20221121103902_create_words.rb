class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string :key, :key_lang, :value, :value_lang
      t.belongs_to :playlist, index: true
      t.timestamps
    end
  end
end
