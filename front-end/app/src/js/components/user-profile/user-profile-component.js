var css = require("../../../css/user-profile.css");
import React from 'react';
import {
  Col,
  Row,
  Divider,
  Table,
  Button,
} from 'antd';
import { Link, Route } from 'react-router-dom'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import UserProfileOverlook from './user-profile-overlook'


export default class UserProfileComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      avatarurl: "http://127.0.0.1:5000/static/uploads/avatar/seafury.jpeg",
      username: "patrick",
      email: "patrick@gmail.com",
      campus: "海珠",
      current: 'overlook',
    }
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    const columns = [{
      title: '基本信息',
      dataIndex: 'baseinfo',
      key: 'baseinfo',
    },];
    const baseinfo = [
      {
        key: '1',
        baseinfo: this.state.username,
      },
      {
        key: '2',
        baseinfo: this.state.email,
      },
      {
        key: '3',
        baseinfo: this.state.campus + "校区",
      },
      {
        key: '4',
        baseinfo: (<span>
          <Button type="primary" ghost><Link to="/setting/profile">修改信息</Link></Button></span>)
      }
    ];


    return (
      <div>
        <Row>
          <Col span={4} />
          <Col span={16}>
            <Divider />
          </Col>
          <Col span={4} />
        </Row>
        <Row>
          <Col span={4} />
          <Col span={3}>
            <div className="profile-main-info">
              <div className="avatar">
                <img src={this.state.avatarurl} />
              </div>
              <Table dataSource={baseinfo} columns={columns} bordered={false} pagination={false} />

            </div>
          </Col>
          <Col span={13}>
            <Row>
            <Menu
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="overlook">
              <Link to={`${this.props.match.path}/overlook`}><Icon type="mail" />总览</Link>
              </Menu.Item>
              <Menu.Item key="clubs">
                <Icon type="mail" />我的社团
              </Menu.Item>
              <Menu.Item key="activities">
                <Icon type="mail" />我的活动
              </Menu.Item>
              <Menu.Item key="recruit">
                <Icon type="mail" />我的招聘
              </Menu.Item>
            </Menu>
            </Row>
            <Row>
              <Route path={`${this.props.match.path}/overlook`} component={UserProfileOverlook}></Route>
            </Row>
          </Col>
          <Col span={4} />
        </Row>
      </div>
    );
  }
}