class RenameRecieverColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :messages, :reciever_id_id, :receiver
    rename_column :messages, :sender_id_id, :sender
  end
end
