class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :product_name
      t.string :avg_rating
      t.string :total_reviews
      t.string :asin

      t.timestamps
    end
  end
end
