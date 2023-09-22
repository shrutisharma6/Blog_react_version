class AddContentColumnToMessages < ActiveRecord::Migration[6.1]
  def change
  end
  add_column :messages, :content, :string
end
