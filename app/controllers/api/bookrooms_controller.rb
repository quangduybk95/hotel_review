module Api
  class BookroomsController < BaseController

    def index
      if params[:user_id].present?
        by_user
      else
        by_hotel
      end

    end


    def create
      @bookroom = Bookroom.create bookroom_params
    end

    def destroy
      @bookroom = Bookroom.find_by(id: params[:id])
      @bookroom.destroy
    end

    private

    def bookroom_params
      params.require(:bookroom).permit Bookroom::CREATE_PARAMS
    end

    def by_user
      @bookrooms = Bookroom.where(user_id: params[:user_id])
    end

    def by_hotel
      @bookrooms = Bookroom.where(hotel_id: params[:hotel_id])
    end

  end

end
