module Api
  module V1
    class ProductsController < ApplicationController
      before_action :set_product, only: [:show, :destroy]

      def index
        render json: Product.all
      end

      def new
      end

      def create
        @product = Product.create(product_params)
        if @product.save
          render json: @product, status: 201
        else
          render json: {errors: @product.errors.full_messages}, status: 422
        end
      end

      def show
      end

      def edit
      end

      def update
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

    end
  end
end
