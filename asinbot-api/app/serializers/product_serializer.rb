class ProductSerializer < ActiveModel::Serializer
  attributes :id, :product_name, :avg_rating, :total_reviews, :asin
  has_many :reviews
  # embed :ids, include: true Outside of root node and review_ids
end

#Product Table Schema
# create_table "products", force: :cascade do |t|
#   t.string "product_name"
#   t.string "avg_rating"
#   t.string "total_reviews"
#   t.string "asin"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
# end
