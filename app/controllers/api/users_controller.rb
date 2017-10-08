module Api
  class UsersController < BaseController
    before_action :find_user , only: [:show, :update]

    def show

    end

    def update
      @user.update_attributes user_params
    end

    def index
      get_users_by_count_locations
    end

    private

    def user_params
      params.require(:user).permit User::UPDATE_PARAMS
    end

    def find_user
      @user = User.find_by id: params[:id]
      return if @user
    end

    def get_users_by_count_locations
      @users = User.joins(:locations).group(:user_id).having('count(user_id) > 0').order('count(user_id) desc')
    end
  end

end
