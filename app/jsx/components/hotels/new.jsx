import {
  withGoogleMap, GoogleMap, Marker, InfoWindow
}
  from 'react-google-maps/lib';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import update from 'react-addons-update';
import AlertContainer from 'react-alert';

import axios from 'axios';
import * as constant from  '../../constant';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
let classNames = require('classnames');
let translate = require('counterpart');
import NavBar from '../static_pages/navbar'
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
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder='Di chuyển đến vị trí của bạn muốn ...'
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        position={marker.position}
        icon={marker.icon}
        clickable={marker.clickable}
        draggable={marker.draggable}
        onClick={() => props.onMarkerClick(marker)}
        onDragEnd={(event) => props.onMarkerDragEnd(marker, index, event)}
      >
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <div>{marker.infoContent}</div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

export default class New_Hotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      distance: 4000,
      lat: 10.7810137,
      lng: 106.6829672,
      center: {
        lat: 10.7810137,
        lng: 106.6829672,
      },
      markers: [],
      image: '',
      hotel: {
        address: "",
        name: "",
        link: "",
        description: "",
        stars: 3,
        cost: 10,
        user_id: JSON.parse(localStorage.grUser).user_id,
      }
    };
  }

  getCurrentLocation() {
    let self = this;
    navigator.geolocation.getCurrentPosition(function (location) {
      let my_location = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
      self.loadRecentMarker(my_location);
    });
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  loadRecentMarker(location) {
    let markers = [];
    let mapCenter = {
      lat: location.lat,
      lng: location.lng
    }
    let myMarker = {
      infoContent: translate('app.map.my_location'),
      id: 'myMarker',
      draggable: true,
      position: {
        lat: location.lat,
        lng: location.lng
      },
      type: "my maker"
    }

    this.setState({
      center: mapCenter,
      markers: this.state.markers.concat(myMarker)
    })
  }

  componentWillMount() {
    this.getCurrentLocation();
  }

  submitEvent() {
    let formData = new FormData();
    formData.append('hotel[name]', this.state.hotel.name);
    formData.append('hotel[address]', this.state.hotel.address);
    formData.append('hotel[longitude]', this.state.markers[0].position.lng);
    formData.append('hotel[latitude]', this.state.markers[0].position.lat);
    formData.append('hotel[description]', this.state.hotel.description);
    formData.append('hotel[user_id]', this.state.hotel.user_id);
    formData.append('hotel[link]', this.state.hotel.link);
    formData.append('hotel[phone]', this.state.hotel.phone);
    formData.append('hotel[cost]', this.state.hotel.cost);
    formData.append('hotel[stars]', this.state.hotel.stars);

    if (this.state.image != null)
      formData.append('hotel[image]', this.state.image);

    axios.post(constant.HOTELS_API, formData)
      .then(response => {
        if (response.data.status == 200)
        {
          this.showAlert(translate('app.error.success'));
          window.location = constant.BASE_URL
        }
        else
        {}

      })
      .catch(error => {
        this.showAlert(translate('app.error.error_validate'));
      });
  }

  handleMapClick(event) {
    let position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    this.state.markers[0] = {
      position: position,
      type: "my marker",
      draggable: true
    }
    this.setState({
      markers: this.state.markers,
      center: position
    });
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

  handleMarkerDrag(marker, index, event) {
    let position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    Object.assign(marker, {position})
    this.state.markers[index] = marker;
    this.setState({
      center: {
        lat: position.lat,
        lng: position.lng
      },
      markers: [this.state.markers[0]]
    })
  }

  handlePlacesChanged() {
    let place = this._searchBox.getPlaces()[0];
    let location = place.geometry.location;
    let position = {
      lat: location.lat(),
      lng: location.lng()
    }
    this.state.markers[0] = {
      position: position,
      type: "my marker",
      draggable: true
    }
    this.setState({markers: this.state.markers, center: position});
  }

  handleImageChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image: reader.result,
      });
    }
    reader.readAsDataURL(file);
  }

  handleChangeInfo(key, event) {
    let newHotel = update(this.state.hotel, {
      [key]: {$set: event.target.value}
    });
    this.setState({hotel: newHotel});
  }

  render() {
    return (
      <section className="new-page">
        <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
        <NavBar current_page={2}/>
        <section className='locations row'>
          <div className="col-md-offset-1 col-md-5">
            <legend>ホテルの情報</legend>
            <div className="row">
              <div data-provides='fileinput'
                   className='fileinput fileinput-new col-md-8 upload-image'>
                <div data-trigger='fileinput' id='avatar'
                     className='fileinput-preview thumbnail img-responsive'>
                  <img src={this.state.image.url || this.state.image}/>
                </div>
                <div className='action-button'>
                <span className='btn btn-default btn-raised btn-file ripple-effect'>
                  <span className='fileinput-new'>
                    <i className='material-icons md-light pmd-xs'>add</i>
                  </span>
                  <span className='fileinput-exists'>
                    <i className='material-icons md-light pmd-xs'>mode_edit</i>
                  </span>
                  <input className='form-control' type='file' name='image' accept='image/*'
                         onChange={e => this.handleImageChange(e)}/>
	              </span>
                  <a data-dismiss='fileinput'
                     className='btn btn-default btn-raised btn-file ripple-effect fileinput-exists'
                     href='javascript:void(0);'>
                    <i className='material-icons md-light pmd-xs'>close</i>
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label>Name</label>
                <input value={this.state.hotel.name} onChange={this.handleChangeInfo.bind(this, 'name')}
                       type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input value={this.state.hotel.address} onChange={this.handleChangeInfo.bind(this, 'address')}
                       type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input placeholder="0975700717" value={this.state.hotel.phone} onChange={this.handleChangeInfo.bind(this, 'phone')}
                       type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Link</label>
                <input placeholder="http://google.com" value={this.state.hotel.link} onChange={this.handleChangeInfo.bind(this, 'link')}
                       type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Cost</label>
                <input value={this.state.hotel.cost} onChange={this.handleChangeInfo.bind(this, 'cost')}
                       type="text" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={this.state.hotel.description}
                          onChange={this.handleChangeInfo.bind(this, 'description')} rows="3" type="text"
                          className="form-control notrz"/>
              </div>

              <button className="btn btn-primary btn-create" onClick={this.submitEvent.bind(this)}>Create</button>
            </div>
          </div>
          <div className="col-md-5">
            <BaseGoogleMap
              containerElement={
                <div style={{height: '600px'}}/>
              }
              mapElement={
                <div style={{height: '600px'}}/>
              }
              center={this.state.center}
              onMapMounted={this.handleMapMounted.bind(this)}
              onBoundsChanged={this.handleBoundsChanged.bind(this)}
              onSearchBoxMounted={this.handleSearchBoxMounted.bind(this)}
              bounds={this.state.bounds}
              onPlacesChanged={this.handlePlacesChanged.bind(this)}
              markers={this.state.markers}
              onMapClick={this.handleMapClick.bind(this)}
              onMarkerDragEnd={this.handleMarkerDrag.bind(this)}
            />
          </div>
        </section>
        <div className="footer navbar-default">
          <p className="text-center">SIG GROUP</p>
        </div>
      </section>
    );
  }
}
