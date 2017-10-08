module Api
  class ReviewsController < BaseController
    before_action :find_review , only: [:update]

    def update
    end

    private

    def user_params
      params.require(:reivew).permit Review::UPDATE_PARAMS
    end

    def find_review
      @review = Review.find_by id: params[:id]
      return if @review
    end
  end

end
