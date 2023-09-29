class DestroyLikes < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :likes
  end
end
