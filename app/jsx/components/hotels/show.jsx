import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
import NavBar from '../static_pages/navbar'
import Footer from '../static_pages/footer'
import StarRatingComponent from 'react-star-rating-component';
import Comment from './comment'
let translate = require('counterpart');

export default class Hotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      image: "",
      reviews: [],
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
    let self = this
    axios.get(constant.HOTELS_API + this.props.params.hotel_id)
      .then((response) => {
        let avatar = {url: ''};
        if (response.data.hotel.info.image.url == null)
          avatar.url = constant.DEFAULT_IMAGE;
        else
          avatar = response.data.hotel.info.image;
        response.data.hotel.info.image = avatar
        self.setState({
          info: response.data.hotel.info,
          image: response.data.hotel.info.image,
          reviews: response.data.hotel.reviews
        })
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  render() {
    return (
      <div>
        <NavBar current_page={4}/>
        <div className="hotel-show">
          <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="pmd-card card-default pmd-z-depth hotel-card">
                <div className="col-md-5 info-hotel text-center">
                  <legend><h1>{this.state.info.name} Hotel</h1></legend>
                  <h2>
                    <p>
                      ${this.state.info.cost}/日
                      <button style={{marginLeft: '10'}} className="btn btn-primary">すぐ予約します</button>
                    </p>
                  </h2>
                  <div className="text-center hotel-stars">
                    <StarRatingComponent
                      name="rate1"
                      starCount={this.state.info.stars}
                      value={this.state.info.stars}
                      editing={false}
                    />
                  </div>
                  <p>{this.state.info.description}</p>
                  <legend>レビュー</legend>
                  <div className="review">
                    {this.state.reviews.length > 0 ?
                      (<Comment comment={this.state.reviews[0]}/>) : ""}
                  </div>
                </div>
                <div className="col-md-7 text-center img-hotel">
                  <img src={this.state.image.url || this.state.image} height={500} width='100%'/>
                </div>


                <div className="row">
                  <div className="col-md-offset-3 col-md-6 reviews">
                    <legend style={{marginTop: '20'}}><h1>レビュー一覧</h1></legend>
                    <div>
                      {this.state.reviews.filter((comment, index) => (index > 0)).map((comment, index) => {
                        return (
                          <Comment key={index} comment={comment}/>
                        )
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}
