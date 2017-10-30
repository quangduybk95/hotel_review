json.hotels @hotels.paginate(:page => params[:page], :per_page => 12)
json.page_count (@hotels.size/12.0).round > @hotels.size/12.0 ? (@hotels.size/12.0).round : ((@hotels.size/12.0).round +1)
