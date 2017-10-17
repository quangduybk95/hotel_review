import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
let translate = require('counterpart');

export default class Hotels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [],
      search_by_name: '',
      search_stars: 1,
      images: [
        'https://a1.r9cdn.net/rimg/dimg/8d/bb/08e1f487-city-35107-158d04b6479.jpg?s14=1&width=1020&height=500&crop=true&xhint=2702&yhint=886',
        'https://media-cdn.tripadvisor.com/media/photo-s/08/20/75/0d/hotel-contessa.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/07/5a/ab/7b/hotel-garda-tonellihotels.jpg',
        'https://s7d2.scene7.com/is/image/ihg/EVEN-Homepage-Hero-Midtown-East-1440x810-Desktop-Dec-2020'
      ]
    }

  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  getHotels(url){
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
          hotels: response.data.hotels
        })
      })
      .catch(function (error) {
        this.showAlert(translate('app.error.error'));
      });
  }

  costDesc(){
    this.getHotels(constant.HOTELS_API+'?cost_desc=true')
  }

  costAsc(){
    this.getHotels(constant.HOTELS_API+'?cost_asc=true')
  }

  componentWillMount() {
    this.getHotels(constant.HOTELS_API)
  }
  search(){
    this.getHotels(constant.HOTELS_API+'?search='+this.state.search_by_name)
    this.preventDefault()
    this.state.search_by_name = ''
  }

  hotelClick(index) {
    window.location = constant.HOTEL_URL + this.state.hotels[index].id
  }

  searchChange(event){
    this.setState({
      search_by_name: event.target.value
    })
  }
  searchByStars(){
    this.getHotels(constant.HOTELS_API+'?stars='+this.state.search_stars)
  }
  searchStarsChange(event){
    this.setState({
      search_stars: parseInt(event.target.value)
    })
  }
  render() {
    return (
      <div className="hotels-index">
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />

        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="slider" id="main-slider">
              <div className="slider-wrapper">
                <img src={this.state.images[0]} alt="First" className="slide" />
                <img src={this.state.images[1]} alt="Second" className="slide" />
                <img src={this.state.images[2]} alt="Third" className="slide" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="navbar-form">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" value={this.state.search_by_name} onChange={this.searchChange.bind(this)} />
                  </div>
                  <button className="btn btn-primary" onClick={this.search.bind(this)}>Search</button>
                </div>
              </div>
              <div className="col-md-3">
                <div className="navbar-form">
                  <div className="form-group">
                    <input type="number" min={1} max={7} className="form-control" placeholder="Search" value={this.state.search_stars} onChange={this.searchStarsChange.bind(this)} />
                  </div>
                  <button className="btn btn-primary" onClick={this.searchByStars.bind(this)}>Search</button>
                </div>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={this.costDesc.bind(this)}>
                  Cost desc
                </button>
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={this.costAsc.bind(this)}>
                  Cost asc
                </button>
              </div>
            </div>
            {this.state.hotels.map((hotel, index) => {
              return (
                <div key={index} className="col-md-3" onClick={this.hotelClick.bind(this, index)}>
                  <div className="hotel text-center pmd-card card-default pmd-z-depth">
                    <img src={hotel.image.url || hotel.image} width={200} height={200}/>
                    <p>{hotel.name} - {hotel.cost}$/日</p>
                  </div>
                </div>)
            })}

          </div>
        </div>
      </div>
    )
  }
}
