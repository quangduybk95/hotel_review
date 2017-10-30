module Api
  class LikesController < BaseController
    # before_action :find_like, only: [:create, :destroy]

    def create
      @like = Like.find_by(user_id: params[:like][:user_id], hotel_id: params[:hotel_id])
      unless @like
        @like = Like.create(user_id: params[:like][:user_id], hotel_id: params[:hotel_id])
      end
    end

    def destroy
      @like = Like.find_by(id: params[:id])
      @like.destroy
    end

    private
    def find_like
      @like = Like.find_by(user_id: params[:like][:user_id], hotel_id: params[:hotel_id])
    end
  end

end
