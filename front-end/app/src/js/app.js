import React from 'react';
import ReactDom from 'react-dom';
import HeaderComponent from './components/header-component';
import UserCenterComponent from './components/user-center/user-center-component';
import ClubAdminComponent from './components/club-admin/club-admin-component';
import TestComponent from './components/test-component'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {auth} from './fetch/login-auth';
import {PrivateRoute} from './routes/private-route';
import Link from 'react-router-dom/Link';



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
          <PrivateRoute authed={auth.loginAuth} path="/club/:cid/admin" component={ClubAdminComponent} />
          <Link to="/club/1/admin">管理社团</Link>
        </div>
      </Router>

    );
  }
}