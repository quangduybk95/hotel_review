module Api
  class UsersController < BaseController
    before_action :find_user , only: [:show, :update]

    def show

    end

    def update
      @user.update_attributes user_params
    end

    def index

    end

    private

    def user_params
      params.require(:user).permit User::UPDATE_PARAMS
    end

    def find_user
      @user = User.find_by id: params[:id]
      return if @user
    end

  end

end
