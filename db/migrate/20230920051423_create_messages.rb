class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.references :sender_id, null: false, foreign_key: { to_table: :users }
      t.references :reciever_id, null: false, foreign_key: { to_table: :users }
      t.boolean :seen, default: false
      t.timestamps
    end
  end
end
