import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
let translate = require('counterpart');
import moment from 'moment'
import 'react-select/dist/react-select.css';
import NavBar from '../static_pages/navbar'

export default class Posted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      email: ''
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
    let self = this
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
          email: response.data.user_email
        })
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  componentWillMount() {
    this.getHotels(constant.HOTELS_API + '?user_id=' + this.props.params.user_id)
  }

  hotelClick(index) {
    window.location = constant.HOTEL_URL + this.state.hotels[index].id
  }

  deleteHotel(id) {
    let self = this
    axios.delete(constant.HOTELS_API + id)
      .then((response) => {
        if (response.status == 200) {
          self.showAlert("success");
        }
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  render() {
    return (
      <div className="hotels-index">
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <NavBar current_page={5}/>
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <legend className="text-center"><h1>{this.state.email}ユーザーの投稿したレビュー</h1></legend>
            {
              this.state.hotels.length > 0 ?
                this.state.hotels.map((hotel, index) => {
                  return (
                    <div key={index} className="col-md-3">
                      <div className="hotel text-center pmd-card card-default pmd-z-depth">
                        <img onClick={this.hotelClick.bind(this, index)} src={hotel.image.url || hotel.image}
                             width="100%"
                             height={200}/>
                        <p>{hotel.name}
                          {hotel.user_id == JSON.parse(localStorage.grUser).user_id ? <span>&nbsp;
                              <button
                                onClick={this.deleteHotel.bind(this, hotel.id)}
                                className="btn btn-danger">削除</button></span>
                            : ""}
                        </p>
                        <p>{hotel.cost}$/日</p>
                        <p>{moment(new Date(hotel.created_at)).format('DD/MM/YYYY, h:mm:ss a')}</p>
                      </div>
                    </div>)
                }) : <div className="text-center"><h2>一度も投稿したことがありません</h2></div>}
          </div>
        </div>
        <div className="footer-non-static navbar-inverse">
          <p className="text-center">Coredump チーム</p>
        </div>

      </div>
    )
  }
}
