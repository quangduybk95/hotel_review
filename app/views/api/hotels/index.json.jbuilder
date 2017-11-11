if params[:user_id].present?
  u = User.find_by(id: params[:user_id])
  json.hotels @hotels
  json.user_email u.email
else
  json.hotels @hotels.paginate(:page => params[:page], :per_page => 12)
  json.page_count (@hotels.size/12.0).round > @hotels.size/12.0 ? (@hotels.size/12.0).round : ((@hotels.size/12.0).round +1)
end
