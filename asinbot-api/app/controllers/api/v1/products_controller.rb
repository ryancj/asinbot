module Api
  module V1
    class ProductsController < ApplicationController
      before_action :set_product, only: [:show, :destroy]

      def index
        render json: Product.all
      end

      def create
        @product = Product.create(product_params)
        
        #Scrape as we send the request
        scrape(@product.asin)

        if @product.save
          render json: @product, status: 201
        else
          render json: {errors: @product.errors.full_messages}, status: 422
        end
      end

      def show
        render json: @product
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
        #Initialize
        agent = Mechanize.new

        #Rate limiting to prevent timeouts
        agent.history_added = Proc.new { sleep 0.5 }

        #Interpolate the given ASIN to url
        page = agent.get("https://www.amazon.com/dp/#{asin}")

        #Pull Product's main information such as: title, image href, avg rating, total reviews
        product_name = page.at('span#productTitle').text.strip
        image = page.search("#landingImage").attribute('src').value
        avg_rating = page.at("i[data-hook='average-star-rating']").text[0..2]
        total_reviews = page.search("span[data-hook='total-review-count']").text

        #Associate to model object
        @product.product_name = product_name
        @product.image = image
        @product.avg_rating  = avg_rating
        @product.total_reviews  = total_reviews

        #Find top reviews on page
        reviews = page.search("div[data-hook='review']")

        all_reviews = reviews.map do |review|
          #Look into '.a-row' as this is how Amazon breaks down the review template
          review_data = review.search('.a-row')

          #Find the most important review information
          reviewer = review_data.search('span.a-profile-name').text
          avatar = review.search('.a-profile-avatar img')[1].attribute('src').value
          rating = review_data.search("i[data-hook='review-star-rating']").text
          review_header = review_data.search("a[data-hook='review-title']").text
          date = review.search("span[data-hook='review-date']").text
          review_body = review_data.search("div[data-hook='review-collapsed']").text
          type_and_verified = review.search(".a-row.review-format-strip").text

          #Store Review field with the scraped data
          @review = Review.new(review_params)
          @review.reviewer = reviewer
          @review.avatar = avatar
          @review.rating = rating
          @review.review_header = review_header
          @review.date = date
          @review.review_body = review_body
          @review.type_and_verified = type_and_verified

          #Associate relationship and save
          @review.product = @product
          @review.save
        end
      end

    end
  end
end
