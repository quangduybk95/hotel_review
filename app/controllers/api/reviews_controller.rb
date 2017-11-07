module Api
  class ReviewsController < BaseController
    before_action :find_review, only: [:update, :destroy]

    def update
    end

    def create
      @review = Review.create review_params
    end

    def update
      @review.update_attributes review_params
    end

    def destroy
      @review.destroy
    end

    private

    def review_params
      params.require(:review).permit Review::CREATE_PARAMS
    end

    def find_review
      @review = Review.find_by id: params[:id]
      return if @review
    end
  end

end
