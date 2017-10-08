module Api
  class HotelsController < BaseController
    before_action :find_hotel , only: [:show, :update]

    def show

    end

    def update
      @hotel.update_attributes hotel_params
    end

    def index

    end

    private

    def hotel_params
      params.require(:hotel).permit Hotel::UPDATE_PARAMS
    end

    def find_hotel
      @hotel = Hotel.find_by id: params[:id]
      return if @hotel
    end
  end

end
