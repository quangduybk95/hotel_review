let translate = require('counterpart');
import axios from 'axios';
import * as constant from  '../../constant';
import {Route, Link} from 'react-router';
import AlertContainer from 'react-alert';
import NavBar from '../static_pages/navbar'
import Footer from '../static_pages/footer'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: '', remember_me: true};
  }

  componentWillMount() {
    if (localStorage.grUser != null) {
      window.location = constant.BASE_URL;
    }
  }

  showAlert(text) {
    this.msg.show(text, {
      time: 3000,
      type: 'success',
      icon: <img src='/assets/warning.png'/>
    });
  }

  handleSubmit(event) {
    let self = this;
    event.preventDefault();
    let formData = new FormData();
    formData.append('sign_in[email]', this.state.email);
    formData.append('sign_in[password]', this.state.password);
    let email = this.state.email;
    axios.post(constant.API_SIGN_IN_URL, formData)
      .then((response) => {

        let avatar = {url: ''};
        if (response.data.user_session.avatar.url == null)
          avatar.url = constant.DEFAULT_AVATAR;
        else
          avatar = response.data.user_session.avatar;

        let gr_user = {
          email: email,
          user_id: response.data.user_session.id,
          USER_TOKEN: response.data.user_session.user_token,
          avatar: avatar,
          name: response.data.user_session.name
        }
        localStorage.setItem('grUser', JSON.stringify(gr_user));
        window.location = constant.BASE_URL;
      })
      .catch(function (error) {
        self.showAlert(translate('app.error.error'));
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <NavBar/>
        <section className='body-custom'>
          <AlertContainer ref={a => this.msg = a} {...constant.ALERT_OPTIONS} />
          <div className='login-card'>
            <div className='pmd-card card-default pmd-z-depth'>
              <div className='login-card'>
                <form onSubmit={this.handleSubmit.bind(this)} method='post'>
                  <div className='pmd-card-title card-header-border text-center'>
                    <h3><strong>{translate('app.login.sign_in')}</strong></h3>
                  </div>

                  <div className='pmd-card-body'>
                    <div className='alert alert-success report' role='alert'>
                      {translate('app.login.error')}</div>
                    <div className='form-group pmd-textfield pmd-textfield-floating-label'>
                      <div className='input-group'>
                        <div className='input-group-addon'>
                          <i className='material-icons md-dark pmd-sm'>perm_identity</i>
                        </div>
                        <input type='text' className='form-control'
                               value={this.state.email}
                               name='email'
                               onChange={this.handleInputChange.bind(this)}
                               placeholder={translate('app.login.email')}
                        />
                      </div>
                    </div>

                    <div className='form-group pmd-textfield pmd-textfield-floating-label'>
                      <div className='input-group'>
                        <div className='input-group-addon'>
                          <i className='material-icons md-dark pmd-sm'>lock_outline</i>
                        </div>
                        <input type='password' className='form-control'
                               value={this.state.password}
                               name='password'
                               onChange={this.handleInputChange.bind(this)}
                               placeholder={translate('app.login.password')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='pmd-card-footer card-footer-no-border card-footer-p16 text-center'>
                    <button className='btn btn-primary btn-block' type='submit'>
                      {translate('app.login.login_view')}
                    </button>
                    <p className='redirection-link'>{translate('app.login.not_user')}
                      <Link to={'/signup'}>{translate('app.login.sign_up')}</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    );
  }
}
