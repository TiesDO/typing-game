class CreateResults < ActiveRecord::Migration[7.0]
  def change
    create_table :results do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :cpm
      t.integer :wpm

      t.timestamps
    end
  end
end
