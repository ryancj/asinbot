module Api
  module V1
    class ProductsController < ApplicationController
      before_action :set_product, only: [:show, :destroy]

      def index
        render json: Products.all
      end

      def new
      end

      def create
      end

      def show
      end

      def edit
      end

      def update
      end

      def destroy
      end

      private

      def set_product
        @product = Product.find(params[:id])
      end

      def product_params
        params.permit(:product_name, :avg_rating, :total_reviews, :asin)
      end

    end
  end
end
