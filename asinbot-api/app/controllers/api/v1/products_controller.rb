module Api
  module V1
    class ProductsController < ApplicationController
      before_action :set_product, only: [:show, :destroy]

      def index
        render json: Product.all
      end

      def create
        @product = Product.create(product_params)
        scrape(@product.asin)

        if @product.save
          render json: @product, status: 201
        else
          render json: {errors: @product.errors.full_messages}, status: 422
        end
      end

      def show
        render json: @product = Product.find(params[:id])
      end

      def destroy
        @product.destroy
        render :show, status: :ok
      end

      private

      def set_product
        @product = Product.find(params[:id])
      end

      def product_params
        params.permit(:product_name, :avg_rating, :total_reviews, :asin)
      end

      def review_params
        params.permit(:review_header, :reviewer, :rating, :review_body, :date, :avatar, :type_and_verified)
      end

      def scrape(asin)
        agent = Mechanize.new
        agent.history_added = Proc.new { sleep 0.5 } #Rate limiting
        page = agent.get("https://www.amazon.com/dp/#{asin}")

        product_name = page.at('span#productTitle').text.strip
        avg_rating = page.at("i[data-hook='average-star-rating']").text
        total_reviews = page.search("span[data-hook='total-review-count']").text

        @product.product_name = product_name
        @product.avg_rating  = avg_rating
        @product.total_reviews  = total_reviews

        reviews = page.search("div[data-hook='review']") #Find top reviews on page

        all_reviews = reviews.map do |review|
          review_data = review.search('.a-row')

          reviewer = review_data.search('span.a-profile-name').text
          avatar = review.search('.a-profile-avatar img')[1].attribute('src').value
          rating = review_data.search("i[data-hook='review-star-rating']").text[0..2]
          review_header = review_data.search("a[data-hook='review-title']").text
          date = review.search("span[data-hook='review-date']").text
          review_body = review_data.search("div[data-hook='review-collapsed']").text
          type_and_verified = review.search(".a-row.review-format-strip").text

          @review = Review.new(review_params)
          @review.reviewer = reviewer
          @review.avatar = avatar
          @review.rating = rating
          @review.review_header = review_header
          @review.date = date
          @review.review_body = review_body
          @review.type_and_verified = type_and_verified

          @review.product = @product
          @review.save
        end
      end

    end
  end
end
