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

      def scrape(asin)
        agent = Mechanize.new
        agent.history_added = Proc.new { sleep 0.5 }
        page = agent.get("https://www.amazon.com/dp/#{asin}")

        product_name = page.at('span#productTitle').text.strip
        avg_rating = page.at("i[data-hook='average-star-rating']").text
        total_reviews = page.search("span[data-hook='total-review-count']").text

        @product.product_name = product_name
        @product.avg_rating = avg_rating
        @product.total_reviews  = total_reviews
        end
      end

    end
  end
end
