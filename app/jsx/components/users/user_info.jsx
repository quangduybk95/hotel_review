let translate = require('counterpart');
import * as constant from  '../../constant'
import axios from 'axios';
import AlertContainer from 'react-alert';
import NavBar from '../static_pages/navbar'
import Footer from '../static_pages/footer'
export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'profile': {
        'id': 1,
        'user_id': 1,
        'name': '',
        'birthday': '',
        'phonenumber': '',
        'gender': 0,
        'avatar': '',
        'description': '',
      },
      avatar: ''
    }
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  getUserInfoById(id) {
    axios.get(constant.API_USER_INFO_URL + id, constant.headers)
      .then(response => {
        this.checkNullInfo(response.data.user_info.profile);
        let avatar = {url: ''};
        if (response.data.user_info.profile.avatar.url == null)
          avatar.url = constant.DEFAULT_AVATAR;
        else
          avatar = response.data.user_info.profile.avatar;
        this.setState({
          email: response.data.user_info.email,
          profile: response.data.user_info.profile,
          avatar: avatar
        })
      })
      .catch(error => {
        this.showAlert(translate('app.error.error'));
      });
  }

  componentWillMount() {
    this.getUserInfoById(this.props.params.user_id);
  }

  checkNullInfo(profile) {
    profile.name = profile.name || '';
    profile.birthday = profile.birthday || '';
    profile.phonenumber = profile.phonenumber || '';
    profile.job = profile.job || '';
    profile.avatar = profile.avatar || constant.DEFAULT_AVATAR;
    profile.description = profile.description || '';
  }

  render() {
    return (
      <section>
        <NavBar/>
        <section className='user-info-show'>
          <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
          <div className='row wrapper-user-info'>
            <div className='pmd-card pmd-z-depth-1 col-md-offset-3 col-md-6 user-info-body'>
              <div className='fileinput fileinput-new col-md-2 col-md-offset-1 avatar'>
                <div className='fileinput-preview thumbnail img-responsive'>
                  <img src={this.state.avatar.url || this.state.avatar}/>
                </div>
              </div>

              <div className='col-md-8'>
                <div className='form-horizontal'>
                  <fieldset>

                    <legend>{translate('app.user_info.user_info')}</legend>

                    <div>
                      <label className='col-sm-3 control-label'>
                        {translate('app.user_info.email')}
                      </label>
                      <div className='col-sm-9'>
                        <p className='form-control-static'><strong>{this.state.email}</strong></p>
                      </div>
                    </div>


                    <div>
                      <label className='col-sm-3 control-label'>
                        {translate('app.user_info.name')}
                      </label>
                      <div className='col-sm-9'>
                        <p className='form-control-static'>{this.state.profile.name}</p>
                      </div>
                    </div>

                    <div>
                      <label className='col-sm-3 control-label'>
                        {translate('app.user_info.phonenumber')}
                      </label>
                      <div className='col-sm-9'>
                        <p className='form-control-static'>{this.state.profile.phonenumber}</p>
                      </div>
                    </div>

                    <div>
                      <label className='col-sm-3 control-label'>
                        {translate('app.user_info.description')}
                      </label>
                      <div className='col-sm-9'>
                        <p className='form-control-static'>{this.state.profile.description}</p>
                      </div>
                    </div>

                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </section>

    );
  }
}
