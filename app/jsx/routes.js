import React from 'react';
import {Router, Route} from 'react-router';
import Home from './components/static_pages/index'
import Signup from './components/users/signup'
import Login from './components/users/login'
import UserUpdate from './components/users/user_update'
import UserInfo from './components/users/user_info'
import Hotel from './components/hotels/show'
import New_Hotel from './components/hotels/new'
const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Home}/>
    <Route path='/signup' component={Signup}/>
    <Route path='/login' component={Login}/>
    <Route path='/my-profile' component={UserUpdate}/>
    <Route path='/users/:user_id' component={UserInfo}/>
    <Route path='/show/:hotel_id' component={Hotel}/>
      <Route path='/create' component={New_Hotel}/>

  </Router>
);
export default Routes;
