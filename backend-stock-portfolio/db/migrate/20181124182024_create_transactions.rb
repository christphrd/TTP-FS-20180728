class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :ticker
      t.integer :quantity
      t.decimal :price
      t.integer :user_id

      t.timestamps
    end
  end
end
