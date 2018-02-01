import React from 'react';
import ReactDom from 'react-dom';
import HeaderComponent from './components/header-component';
import UserCenterComponent from './components/user-center/user-center-component';
import TestComponent from './components/test-component'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {auth} from './fetch/login-auth';
import {PrivateRoute} from './routes/private-route';



export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <div>
          <HeaderComponent />
          <PrivateRoute authed={auth.loginAuth} path="/setting" component={UserCenterComponent} />
        </div>
      </Router>

    );
  }
}