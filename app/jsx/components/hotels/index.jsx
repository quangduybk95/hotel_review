import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
let translate = require('counterpart');
import ReactPaginate from 'react-paginate';
import moment from 'moment'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
      ],
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

  costDesc() {
    this.state.page = 1
    this.state.type = 2
    this.getHotels(constant.HOTELS_API + '?cost_desc=true&page=' + this.state.page)
  }

  costAsc() {
    this.state.page = 1
    this.state.type = 3
    this.getHotels(constant.HOTELS_API + '?cost_asc=true&page=' + this.state.page)
  }

  componentWillMount() {
    this.getHotels(constant.HOTELS_API + '?page=' + this.state.page)
  }

  search() {
    this.state.page = 1
    this.state.type = 4
    this.getHotels(constant.HOTELS_API + '?search=' + this.state.search_by_name + '&page=' + this.state.page)
    this.preventDefault()
  }

  hotelClick(index) {
    window.location = constant.HOTEL_URL + this.state.hotels[index].id
  }

  searchChange(event) {
    this.setState({
      search_by_name: event.target.value
    })
  }

  searchByStars() {
    this.state.page = 1
    this.state.type = 5
    this.getHotels(constant.HOTELS_API + '?stars=' + this.state.search_stars + '&page=' + this.state.page)
  }

  searchStarsChange(event) {
    this.setState({
      search_stars: parseInt(event.target.value)
    })
  }

  handlePageClick(data) {
    let selected = data.selected + 1;
    this.state.page = selected
    switch (this.state.type) {
      case 1 :
        this.getHotels(constant.HOTELS_API + '?page=' + this.state.page)
        break
      case 2 :
        this.getHotels(constant.HOTELS_API + '?cost_desc=true&page=' + this.state.page)
        break
      case 3 :
        this.getHotels(constant.HOTELS_API + '?cost_asc=true&page=' + this.state.page)
        break
      case 4 :
        this.getHotels(constant.HOTELS_API + '?search=' + this.state.search_by_name + '&page=' + this.state.page)
        break
      case 5 :
        this.getHotels(constant.HOTELS_API + '?stars=' + this.state.search_stars + '&page=' + this.state.page)
        break
    }
  };

  logChange(val) {
    this.state.filter = val.value
    switch (val.type) {
      case 1 :
        this.state.page = 1
        this.getHotels(constant.HOTELS_API + '?page=' + this.state.page)
        break
      case 2 :
        this.costDesc()
        break
      case 3 :
        this.costAsc()
        break

    }
  }

  render() {
    var options = [
      {value: 'one', label: 'Time newest', type: 1},
      {value: 'two', label: 'Cost desc', type: 2},
      {value: 'three', label: 'Cost asc', type: 3}
    ];
    return (
      <div className="hotels-index">
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />

        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="slider" id="main-slider">
              <div className="slider-wrapper">
                <img src={this.state.images[0]} className="slide"/>
                <img src={this.state.images[1]} className="slide"/>
                <img src={this.state.images[2]} className="slide"/>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <Select
                  name="form-field-name"
                  value={this.state.filter}
                  options={options}
                  onChange={this.logChange.bind(this)}
                />
              </div>
            </div>
              <div className="row">
                <div className="navbar-form">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" value={this.state.search_by_name}
                           onChange={this.searchChange.bind(this)}/>
                  </div>
                  <button className="btn btn-primary" onClick={this.search.bind(this)}>Search</button>
                </div>
              </div>
              <div className="row">
                <div className="navbar-form">
                  <div className="form-group">
                    <input type="number" min={1} max={7} className="form-control" placeholder="Search"
                           value={this.state.search_stars} onChange={this.searchStarsChange.bind(this)}/>
                  </div>
                  <button className="btn btn-primary" onClick={this.searchByStars.bind(this)}>By Hotel Stars</button>
                </div>
              </div>
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
        <div className="text-center">
          <div style={{margin: '15px auto'}}>
            <ReactPaginate previousLabel={"<"}
                           nextLabel={">"}
                           breakLabel={<a href="">...</a>}
                           breakClassName={"break-me"}
                           pageCount={this.state.pageCount}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           containerClassName={"pagination"}
                           subContainerClassName={"pages pagination"}
                           onPageChange={this.handlePageClick.bind(this)}
                           activeClassName={"active"}/>
          </div>
        </div>
      </div>
    )
  }
}
