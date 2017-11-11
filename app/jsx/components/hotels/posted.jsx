import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
let translate = require('counterpart');
import moment from 'moment'
import 'react-select/dist/react-select.css';

export default class Posted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      search_by_name: '',
      search_stars: 1,
      pageCount: 1,
      page: 1,
      type: 1,
      filter: 'one'
    }

  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  getHotels(url) {
    axios.get(url)
      .then((response) => {
        response.data.hotels.map((hotel, index) => {
          let image = {url: ''}
          if (hotel.image.url == null)
            image.url = constant.DEFAULT_IMAGE;
          else
            image = hotel.image
          hotel.image = image
          return hotel
        })

        this.setState({
          hotels: response.data.hotels,
          pageCount: response.data.page_count
        })
      })
      .catch(function (error) {
        this.showAlert(translate('app.error.error'));
      });
  }

  componentWillMount() {
    this.getHotels(constant.HOTELS_API + this.props.params.user_id)
  }

  hotelClick(index) {
    window.location = constant.HOTEL_URL + this.state.hotels[index].id
  }

  render() {
    return (
      <div className="hotels-index">
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            {this.state.hotels.map((hotel, index) => {
              return (
                <div key={index} className="col-md-3" onClick={this.hotelClick.bind(this, index)}>
                  <div className="hotel text-center pmd-card card-default pmd-z-depth">
                    <img src={hotel.image.url || hotel.image} width="100%" height={200}/>
                    <p>{hotel.name}</p>
                    <p>{hotel.cost}$/日</p>
                    <p>{moment(new Date(hotel.created_at)).format('DD/MM/YYYY, h:mm:ss a')}</p>
                  </div>
                </div>)
            })}

          </div>
        </div>
      </div>
    )
  }
}
