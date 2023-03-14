class AddCollumnsToResults < ActiveRecord::Migration[7.0]
  def change
    add_column :results, :correct_cpm, :integer
    add_column :results, :time_elapsed, :integer
    add_column :results, :final_mistakes, :integer
    add_column :results, :total_mistakes, :integer
    add_column :results, :total_words, :integer
    add_column :results, :total_characters, :integer
  end
end
