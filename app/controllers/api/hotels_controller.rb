module Api
  class HotelsController < BaseController
    before_action :find_hotel , only: [:show, :update]

    def show

    end

    def update
      @hotel.update_attributes hotel_params
    end

    def index
      if params[:cost_desc]
        cost_desc
      elsif params[:cost_asc]
        cost_asc
      elsif params[:search].present?
        search_by_name
      elsif params[:stars].present?
        search_by_stars
      else
        @hotels = Hotel.all
      end

    end

    def create
      @hotel = Hotel.create hotel_params
    end

    private

    def find_hotel
      @hotel = Hotel.find_by id: params[:id]
      return if @hotel
    end

    def hotel_params
      params.require(:hotel).permit Hotel::CREATE_PARAMS
    end

    def cost_desc
        @hotels = Hotel.all.order(cost: :desc)
    end

    def cost_asc
      @hotels = Hotel.all.order(cost: :asc)
    end

    def search_by_stars
      @hotels = Hotel.where("stars = ?", params[:stars].to_i)
    end

    def search_by_name
      query = "%#{params[:search]}%"
      @hotels = Hotel.where("name like ?", query)
    end
  end

end
