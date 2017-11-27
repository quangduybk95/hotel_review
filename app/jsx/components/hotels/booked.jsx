import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
let translate = require('counterpart');
import moment from 'moment'
import 'react-select/dist/react-select.css';
import NavBar from '../static_pages/navbar'

export default class Booked extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.params.user_id != JSON.parse(localStorage.grUser).user_id)
      window.location = constant.BASE_URL
    this.state = {
      bookrooms: [],
    }

  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  getData(url) {
    let self = this
    axios.get(url)
      .then((response) => {
        this.setState({
          bookrooms: response.data.bookrooms,
        })
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  componentWillMount() {
    this.getData(constant.BOOKED_API + '?user_id=' + this.props.params.user_id)
  }

  hotelClick(hotel_id) {
    window.location = constant.HOTEL_URL + hotel_id
  }

  deleteBooked(id) {
    let self = this
    axios.delete(constant.BOOKED_API + id)
      .then((response) => {
        if (response.status == 200) {
          self.showAlert("success");
          this.getData(constant.BOOKED_API + '?user_id=' + this.props.params.user_id)
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
            <legend className="text-center"><h1>予約したホテル</h1></legend>
            {
              this.state.bookrooms.length > 0 ?
                this.state.bookrooms.map((bookroom, index) => {
                  return (
                    <div key={index} className="col-md-3">
                      <div className="hotel text-center pmd-card card-default pmd-z-depth">
                        <a onClick={this.hotelClick.bind(this, bookroom.hotel.id)}>{bookroom.hotel.name} Hotel</a>
                        <p>{bookroom.cost}$/{bookroom.days}日</p>
                        <p>{moment(new Date(bookroom.bookroom.start)).format('YYYY/MM/DD')} から</p>
                        <p>{moment(new Date(bookroom.bookroom.end)).format('YYYY/MM/DD')} まで</p>
                        <p>
                          {bookroom.bookroom.user_id == JSON.parse(localStorage.grUser).user_id ? <span>&nbsp;
                              <button
                                onClick={this.deleteBooked.bind(this, bookroom.bookroom.id)}
                                className="btn btn-danger">{translate('app.show.delete')}</button></span>
                            : ""}
                        </p>
                      </div>
                    </div>)
                }) : <div className="text-center"><h2>予約したことがありません</h2></div>}
          </div>
        </div>
        <div className="footer-non-static navbar-inverse">
          <p className="text-center">Coredump {translate('app.static_pages.team')}</p>
        </div>

      </div>
    )
  }
}
