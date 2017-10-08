import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
import NavBar from '../static_pages/navbar'
import Footer from '../static_pages/footer'


export default class Hotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: {}
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
    axios.get(constant.HOTELS_API + this.props.params.hotel_id)
      .then((response) => {
        this.setState({
          hotel: response.data.hotel
        })
      })
      .catch(function (error) {
        this.showAlert(translate('app.error.error'));
      });
  }

  render() {
    return (
      <div>
        <NavBar current_page={4}/>
        <div className="hotel-show">
          <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="pmd-card card-default pmd-z-depth">
                sadfg
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
