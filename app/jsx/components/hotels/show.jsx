import axios from 'axios';
import * as constant from  '../../constant';
import AlertContainer from 'react-alert';
import NavBar from '../static_pages/navbar'
import Footer from '../static_pages/footer'
import StarRatingComponent from 'react-star-rating-component';
import Comment from './comment'
let translate = require('counterpart');
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {
  withGoogleMap, GoogleMap, Marker, InfoWindow, DirectionsRenderer
}
  from 'react-google-maps/lib';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

const INPUT_STYLE = {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  border: '1px solid transparent',
  width: '300px',
  height: '32px',
  marginTop: '27px',
  padding: '0 12px',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipses',
};

const BaseGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onClick={props.onMapClick.bind()}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        icon={marker.icon}
      >
      </Marker>
    ))}
    {props.directions && <DirectionsRenderer directions={props.directions}/>}
  </GoogleMap>
));


export default class Hotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      image: "",
      reviews: [],
      newReview_comment: '',
      newReview_rate: 1,
      like: 1,
      liked: true,
      like_id: 1,
      comment_id: 0,
      bounds: null,
      lat: 10.7810137,
      lng: 106.6829672,
      center: {
        lat: 10.7810137,
        lng: 106.6829672,
      },
      markers: [],
      origin: new google.maps.LatLng(10.7810137, 106.6829672),
      destination: new google.maps.LatLng(10.7810137, 106.6829672),
      directions: null,
    }
  }

  handleMapClick(event) {
    let position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    this.state.origin = new google.maps.LatLng(position.lat, position.lng)
    this.draw()
  }

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  getData() {
    let self = this
    axios.get(constant.HOTELS_API + this.props.params.hotel_id + '/?user_id=' + JSON.parse(localStorage.grUser).user_id)
      .then((response) => {
        let avatar = {url: ''};
        if (response.data.hotel.info.image.url == null)
          avatar.url = constant.DEFAULT_IMAGE;
        else
          avatar = response.data.hotel.info.image;
        response.data.hotel.info.image = avatar
        let position = {
          lat: response.data.hotel.info.latitude,
          lng: response.data.hotel.info.longitude
        }

        let myMarker = {
          position: position,
        }
        self.setState({
          info: response.data.hotel.info,
          image: response.data.hotel.info.image,
          reviews: response.data.hotel.reviews,
          like: response.data.hotel.like,
          liked: response.data.hotel.liked,
          like_id: response.data.hotel.like_id,
          newReview_comment: '',
          markers: [myMarker],
          center: position,
          origin: new google.maps.LatLng(response.data.hotel.info.latitude, response.data.hotel.info.longitude),
          destination: new google.maps.LatLng(response.data.hotel.info.latitude, response.data.hotel.info.longitude),
        })
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });

  }

  deletePostClick() {
    let self = this
    axios.delete(constant.HOTELS_API + this.props.params.hotel_id)
      .then((response) => {
        if (response.status == 200) {
          window.location = constant.BASE_URL
        }
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  createReview() {
    let formData = new FormData();
    formData.append('review[user_id]', JSON.parse(localStorage.grUser).user_id);
    formData.append('review[hotel_id]', this.props.params.hotel_id);
    formData.append('review[comment]', this.state.newReview_comment);
    formData.append('review[rate]', this.state.newReview_rate);
    let self = this
    axios.post(constant.HOTELS_API + this.props.params.hotel_id + '/reviews/', formData)
      .then((response) => {
        if (response.data.status == 200) {
          self.getData()
        }
        else {
          location.reload()
        }
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  editReview(id) {
    this.handleClose()
    let formData = new FormData();
    formData.append('review[user_id]', JSON.parse(localStorage.grUser).user_id);
    formData.append('review[hotel_id]', this.props.params.hotel_id);
    formData.append('review[comment]', this.state.newReview_comment);
    formData.append('review[rate]', this.state.newReview_rate);
    let self = this
    axios.patch(constant.HOTELS_API + this.props.params.hotel_id + '/reviews/' + id, formData)
      .then((response) => {
        if (response.data.status == 200) {
          location.reload()
        }
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  likeBtn() {
    let formData = new FormData();
    formData.append('like[user_id]', JSON.parse(localStorage.grUser).user_id);
    let self = this
    axios.post(constant.HOTELS_API + this.props.params.hotel_id + '/likes/', formData)
      .then((response) => {
        if (response.data.status == 200) {
          self.getData()
        }
        else {
        }
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  unlikeBtn() {
    let formData = new FormData();
    formData.append('like[user_id]', JSON.parse(localStorage.grUser).user_id);
    let self = this
    axios.delete(constant.HOTELS_API + this.props.params.hotel_id + '/likes/' + this.state.like_id, formData)
      .then((response) => {
        if (response.data.status == 200) {
          self.getData()
        }
        else {
        }
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  componentWillMount() {
    this.getData()
  }

  draw() {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
          markers: []
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }


  commentChange(event) {
    this.setState({newReview_comment: event.target.value})
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({newReview_rate: nextValue});
  }

  handleClose() {
    this.setState({
      isShowingModal: false,
      newReview_comment: '',
      newReview_rate: 1,
      comment_id: 0
    });
  }

  editClick(comment) {
    this.setState({
      isShowingModal: true,
      newReview_comment: comment.comment,
      newReview_rate: comment.rate,
      comment_id: comment.id
    });
  }

  deleteClick(comment) {
    let formData = new FormData();
    let self = this
    axios.delete(constant.HOTELS_API + this.props.params.hotel_id + '/reviews/' + comment.id, formData)
      .then((response) => {
        if (response.data.status == 200) {
          self.getData()
        }
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  linkClick(link) {
    window.open(link);
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
                  <legend><h1>{this.state.info.name} Hotel</h1>
                    {this.state.info.user_id == JSON.parse(localStorage.grUser).user_id ? <span><button
                        onClick={this.deletePostClick.bind(this)} className="btn btn-danger">削除</button></span>
                      : ""}
                  </legend>
                  <h2>
                    <p>
                      ${this.state.info.cost}/日
                      <button onClick={this.linkClick.bind(this, "http://google.com")} style={{marginLeft: '10'}}
                              className="btn btn-primary">すぐ予約します
                      </button>
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
                      (<Comment
                        comment={this.state.reviews[0]}/>) : ""}
                  </div>
                  {this.state.liked ? [<button className="btn btn-danger" onClick={this.unlikeBtn.bind(this)}>
                      ライクしない</button>, <span> あなたと{this.state.like - 1} ユーザーライクしました</span>] :
                    [<button className="btn btn-primary" onClick={this.likeBtn.bind(this)}>ライク</button>,
                      <span> {this.state.like} ユーザーライクしました</span>]}
                </div>
                <div className="col-md-7 text-center img-hotel">
                  <img src={this.state.image.url || this.state.image} height={700} width='100%'/>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <BaseGoogleMap
                      containerElement={
                        <div style={{height: '400px'}}/>
                      }
                      mapElement={
                        <div style={{height: '400px'}}/>
                      }
                      center={this.state.center}
                      onMapMounted={this.handleMapMounted.bind(this)}
                      onBoundsChanged={this.handleBoundsChanged.bind(this)}
                      bounds={this.state.bounds}
                      markers={this.state.markers}
                      onMapClick={this.handleMapClick.bind(this)}
                      directions={this.state.directions}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-offset-3 col-md-6 reviews">
                    <legend style={{marginTop: '20'}}><h1>他のレビュー一覧</h1></legend>
                    <div>
                      {this.state.reviews.filter((comment, index) => (index > 0)).map((comment, index) => {
                        if (comment.user_id == JSON.parse(localStorage.grUser).user_id)
                          return (
                            <div style={{marginBottom: '10'}}>
                              <Comment key={index} comment={comment}/>
                              <span><button onClick={this.editClick.bind(this, comment)} className="btn btn-primary">
                              編集</button></span>
                              <span><button onClick={this.deleteClick.bind(this, comment)} className="btn btn-danger">
                              削除</button></span></div>)
                        else
                          return (<Comment key={index} comment={comment}/>)
                      })}
                    </div>
                    <div className="row" style={{marginBottom: '30'}}>
                      <div className="col-md-6">
                        <input placeholder="write comment" type="text" className="form-control"
                               value={this.state.newReview_comment}
                               onChange={this.commentChange.bind(this)}/>
                      </div>
                      <div className="col-md-3">
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={this.state.newReview_rate}
                          editing={true}
                          onStarClick={this.onStarClick.bind(this)}
                        />
                      </div>
                      <button onClick={this.createReview.bind(this)} className="col-md-3 btn btn-primary">投稿</button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose.bind(this)}>
              <ModalDialog onClose={this.handleClose.bind(this)}>
                <div className="row" style={{marginBottom: '30'}}>
                  <div className="col-md-5">
                    <input placeholder="write comment" type="text" className="form-control"
                           value={this.state.newReview_comment}
                           onChange={this.commentChange.bind(this)}/>
                  </div>
                  <div className="col-md-4">
                    <StarRatingComponent
                      name="rate2"
                      starCount={5}
                      value={this.state.newReview_rate}
                      editing={true}
                      onStarClick={this.onStarClick.bind(this)}
                    />
                  </div>
                  <button onClick={this.editReview.bind(this, this.state.comment_id)}
                          className="col-md-3 btn btn-primary">Update
                  </button>
                </div>
              </ModalDialog>
            </ModalContainer>
          }

        </div>
        <div className="navbar-default" style={{height: '100', paddingTop: '30'}}>
          <p className="text-center">Coredump チーム</p>
        </div>
      </div>
    )
  }
}
