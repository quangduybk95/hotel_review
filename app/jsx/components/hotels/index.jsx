import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';


export default class Hotels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: []
    }


  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  componentWillMount() {
    axios.get(constant.HOTELS_API)
      .then((response) => {
        this.setState({
          hotels: response.data.hotels
        })
      })
      .catch(function (error) {
        this.showAlert(translate('app.error.error'));
      });
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
                <div className="col-md-3" onClick={this.hotelClick.bind(this, index)}>
                  <div className="hotel text-center pmd-card card-default pmd-z-depth">
                    <img src={hotel.image} width={200} height={200}/>
                    <p>{hotel.name}</p>
                  </div>
                </div>)
            })}

          </div>
        </div>
      </div>
    )
  }
}
