var css = require("../../../css/user-center.css");
import React from 'react';
import {
  Menu, Icon, Switch,
  Col,
  Row,

} from 'antd';
import { Link, Route, HashRouter as Router } from 'react-router-dom';

import BaseInfo from './base-info'
import AccountSetting from './account-setting'
import TestComponent from '../test-component'
import {withRouter} from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class UserCenterComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: 'light',
      current: 'profile',
    }
  }

  componentDidMount(){
    this.props.history.push(`${this.props.match.url}/profile`)
  }
  handleClick(e) {
    console.log('click ', e);
    console.log(this.props.match);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className="setting">
        <Row>
          <Col span={4} />
          <Col span={3}>
            <Menu className="seting-menu"
              theme={this.state.theme}
              onClick={this.handleClick.bind(this)}
              style={{ width: 150 }}
              defaultOpenKeys={['sub1']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="sub1" title={<span><Icon type="setting" /><span>用户设置</span></span>}>
                <Menu.Item key="profile"><Link to={`${this.props.match.url}/profile`}>基本信息</Link></Menu.Item>
                <Menu.Item key="account"><Link to={`${this.props.match.url}/account`}>账户设置</Link></Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="mail" /><span>Navigation Three</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
            </Col>
            <Col span={13}>
            <Route path={`${this.props.match.path}/profile`} component={BaseInfo} />
            <Route  path={`${this.props.match.path}/account`} component={AccountSetting}/>
            </Col>
          <Col span={4} />
        </Row>
      </div>
    );
  }
}

export default withRouter(UserCenterComponent);