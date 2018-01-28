class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :reviewer, :avatar, :rating, :date, :review_header,
  :review_body, :type_and_verified
end

#Review Table Schema
# create_table "reviews", force: :cascade do |t|
#   t.bigint "product_id"
#   t.string "reviewer"
#   t.string "avatar"
#   t.string "rating"
#   t.string "date"
#   t.string "review_header"
#   t.text "review_body"
#   t.string "type_and_verified"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.index ["product_id"], name: "index_reviews_on_product_id"
# end
