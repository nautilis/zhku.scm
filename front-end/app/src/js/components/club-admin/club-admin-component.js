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
import ActivityPublish from "./activity-publish";
import ActivityList from "./activity-list";
import ArticleList from "./article-list";
import EmploymentList from "./employment-list";
import ActivityApply from "./activity-apply";
import ActivityEdit from "./activity-edit";
import ArticleEdit from "./article-edit";
import EmploymentEidt from "./employment-edit";

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
            <Menu.Item key="2"><Link to={`${this.props.match.url}/articles`}>查看文章</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>活动管理</span></span>}>
            <Menu.Item key="5"><Link to={`${this.props.match.url}/create-activity`}>发布活动</Link></Menu.Item>
            <Menu.Item key="7"><Link to={`${this.props.match.url}/activities`}>查看活动</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>招聘管理</span></span>}>
            <Menu.Item key="9"><Link to={`${this.props.match.url}/create-employment`}>发布招聘</Link></Menu.Item>
            <Menu.Item key="10"><Link to={`${this.props.match.url}/employments`}>编辑招聘</Link></Menu.Item>
            <Menu.Item key="11"><Link to={`${this.props.match.url}/applies`}>查看报名</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" title={<span><Icon type="setting" /><span>社团信息管理</span></span>}>
            <Menu.Item key="11"><Link to={`${this.props.match.url}/update-club-info`}>社团信息编辑</Link></Menu.Item>
          </SubMenu>
        </Menu>
        </Col>
        <Col span={13}>
        <Route path={`${this.props.match.path}/create-article`} component={CreateArticle} exact/> 
        <Route path={`${this.props.match.path}/update-club-info`} render={(props) => (
        <UpdateClubInfoComponent cid={this.props.match.params.cid} {...props} />
        )}/> 
        <Route path={`${this.props.match.path}/create-employment`} component={EmploymentPublish} exact/> 
        <Route path={`${this.props.match.path}/applies`} component={ApplyList} exact/>
        <Route path={`${this.props.match.path}/create-activity`} component={ActivityPublish} exact />
        <Route path={`${this.props.match.path}/activities`} component={ActivityList} exact/>
        <Route path={`${this.props.match.path}/activities/:acid/applies`} component={ActivityApply} />
        <Route path={`${this.props.match.path}/activities/:acid/edit`} component={ActivityEdit} exact/>
        <Route path={`${this.props.match.path}/articles`} component={ArticleList} exact/>
        <Route path={`${this.props.match.path}/articles/:aid/edit`} component={ArticleEdit} exact/>
        <Route path={`${this.props.match.path}/employments`} component={EmploymentList} exact />
        <Route path={`${this.props.match.path}/employments/:eid/edit`} component={EmploymentEidt} exact />
        </Col>
        <Col span={4}/>
        </Row>
      </div>
    );
  }
}
