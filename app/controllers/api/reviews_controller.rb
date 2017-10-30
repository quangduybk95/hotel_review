module Api
  class ReviewsController < BaseController
    before_action :find_review , only: [:update]

    def update
    end

    def create
      @review = Review.create review_params
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
