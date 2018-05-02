import React from 'react';
import { Menu, Icon, Switch, Row, Col } from 'antd';
const SubMenu = Menu.SubMenu;
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import CreateArticle from './create-article';
import UpdateClubInfoComponent from './update-club-info';
let css = require("../../../css/club-admin.css");
import TestComponent from "../test-component";
import EmploymentPublish from "./employment-publish";
import AppyList from "./apply-list";
import ApplyList from './apply-list';

export default class ClubAdminComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: 'light',
      current: '1',
    }
  }

  handleClick(e){
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className="club-setting">
        <Row>
          <Col span={4}/>
          <Col span={3}>
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick.bind(this)}
          style={{ width: 150 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
          className="setting-menu"
        >
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>文章管理</span></span>}>
            <Menu.Item key="1"><Link to={`${this.props.match.url}/create-article`}>新建文章</Link></Menu.Item>
            <Menu.Item key="2">修改文章</Menu.Item>
            <Menu.Item key="3">删除文章</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>活动管理</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>招聘管理</span></span>}>
            <Menu.Item key="9"><Link to={`${this.props.match.url}/create-employment`}>发布招聘</Link></Menu.Item>
            <Menu.Item key="10">修改招聘</Menu.Item>
            <Menu.Item key="11"><Link to={`${this.props.match.url}/applies`}>查看报名</Link></Menu.Item>
            <Menu.Item key="12">录用成员</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><Icon type="setting" /><span>社团信息管理</span></span>}>
            <Menu.Item key="11"><Link to={`${this.props.match.url}/update-club-info`}>社团信息编辑</Link></Menu.Item>
          </SubMenu>
        </Menu>
        </Col>
        <Col span={13}>
        <Route path={`${this.props.match.path}/create-article`} component={CreateArticle}/> 
        <Route path={`${this.props.match.path}/update-club-info`} render={(props) => (
        <UpdateClubInfoComponent cid={this.props.match.params.cid} {...props} />
        )}/> 
        <Route path={`${this.props.match.path}/create-employment`} component={EmploymentPublish}/> 
        <Route path={`${this.props.match.path}/applies`} component={ApplyList}/>
        </Col>
        <Col span={4}/>
        </Row>
      </div>
    );
  }
}
