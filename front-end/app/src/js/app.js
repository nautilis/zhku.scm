import React from 'react';
import ReactDom from 'react-dom';
import HeaderComponent from './components/header-component';
import UserCenterComponent from './components/user-center/user-center-component';
import ClubAdminComponent from './components/club-admin/club-admin-component';
import UserProfileComponent from './components/user-profile/user-profile-component';
import TestComponent from './components/test-component'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {auth} from './fetch/login-auth';
import {PrivateRoute} from './routes/private-route';
import Link from 'react-router-dom/Link';
import { Carousel, Row, Col} from 'antd';
import MainPage from "./components/main-page/main-page";
import ArticleIndex from "./components/article/article-index";
import ClubMainPageComponent from "./components/club/main-page";
import ShowEmployment from "./components/employment/show-employment";
import ShowActivity from "./components/activity/show-activity";




export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div>
          <HeaderComponent />
          <Route path="/" component={MainPage} exact/>
          <PrivateRoute authed={auth.loginAuth} path="/setting" component={UserCenterComponent} />
          <PrivateRoute authed={auth.loginAuth} path="/club/:cid/admin" component={ClubAdminComponent} />
          <PrivateRoute authed={auth.loginAuth} path="/profile" component={UserProfileComponent}/>
          <Route path="/article/:id" component={ArticleIndex}/>
          <Route path="/club/:cid" component={ClubMainPageComponent} exact/>
          <Route path="/employment/:id" component={ShowEmployment} />
          <Route path="/activity/:id" component={ShowActivity}/>
        </div>
      </Router>

    );
  }
}
