import React from 'react';
import {
  Col,
  Row,
  Menu,
  Modal,
  Button,
  Icon,
  Tabs,
  Form,
  Input,
  message,
} from 'antd';
import { Link } from 'react-router-dom'
var css = require("../../css/header.css")

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class HeaderComponent extends React.Component {
  constructor() {
    super();

    var token = localStorage.getItem('scm-token');
    var logined = false;
    if (token != null){
      logined = true;
    }
    this.state = {
      token: token,
      logined: logined,
      username: "",
      registerVisible: false,
      loginVisible: false,
    }

  }
  hideRegisterModal() {
    this.props.form.resetFields();
    this.setState({ registerVisible: false });
  }

  hideLoginModal() {
    this.setState({ loginVisible: false });
  }

  showModal(type) {
    console.log("on show modal");
    if (type == "register") {
      this.setState({ registerVisible: true });
    } else if (type == "login") {
      this.setState({ loginVisible: true });
    }
  }



  handleRegisterSubmit(e) {
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();

    console.log(formData);
    var fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        credentials: "include",
      },
      // mode: "no-cors",
      body: JSON.stringify({
        schoolid: formData.schoolid,
        password: formData.password,
      }),
    };

    fetch("http://127.0.0.1:5000/api/v1/user/", fetchOptions).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      var error = json.error;
      if (error == "1") {
        message.success(json.message);
      } else {
        message.success(json.message);
        this.props.form.resetFields();
        this.setState({ registerVisible: false });
      }
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();
    console.log(formData)
    var fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        credentials: "include",
      },
      // mode: "no-cors",
      body: JSON.stringify({
        schoolid: formData.l_schoolid,
        password: formData.l_password,
      }),
    };
    fetch("http://127.0.0.1:5000/api/v1/user/login", fetchOptions).then(response => {
      return response.json();
    }).then(json => {
      console.log("respone json", json);
      if (json.error == '1') {
        message.error(json.message);
      } else {
        localStorage.setItem('scm-token', json.token);
        message.success(json.message);
        console.log(localStorage.getItem('scm-token'))
        this.props.form.resetFields();
        this.setState({
          loginVisible: false,
          logined: true,
          token: json.token,
        });
      }
    });

  }

  loginOut(){
    var fetchOptions={
      method: "GET",
      headers:{
        Authorization: this.state.token,
      }
    };
    fetch("http://127.0.0.1:5000/api/v1/user/logout", fetchOptions).then(response=>{
      return response.json();
    }).then(json=>{
      if(json.status == "fail"){
        message.error(json.message);
      }else{
        message.info(json.message);
      }
    });
    this.setState({logined: false});
    localStorage.removeItem('scm-token');

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const userShow = this.state.logined ?
      <Menu mode="horizontal" className="menu">
        <Menu.Item key="userinfo" >
          <span><a href="#"><Icon type="user" className="menu-icon" /></a></span>
        </Menu.Item>
        <Menu.Item key="logout">
          <span><Icon type="poweroff" className="menu-icon" onClick={this.loginOut.bind(this)}/></span>
        </Menu.Item>
      </Menu>
      :
      <Menu mode="horizontal" className="menu">
        <Menu.Item key="signInUp">
          <Button type="primary" htmlType="button" onClick={this.showModal.bind(this, "register")}>注册</Button>
        </Menu.Item>
        <Menu.Item key="login">
          <Button type="primary" htmlType="button" onClick={this.showModal.bind(this, "login")} >登录</Button>
        </Menu.Item>
      </Menu>


    const registerModal =
      <Modal
        visible={this.state.registerVisible}
        onCancel={this.hideRegisterModal.bind(this)}
        onOk={this.hideRegisterModal.bind(this)}
        cancelText="取消"
      >
        <Tabs type="card">
          <TabPane tab="注册" key="1">
            <Form onSubmit={this.handleRegisterSubmit.bind(this)}>
              <FormItem label="学号">
                {getFieldDecorator('schoolid')(
                  <Input placeholder="请输入学号" />
                )}
              </FormItem>
              <FormItem label="密码">
                {getFieldDecorator('password')(
                  <Input placeholder="请输入密码" type="password" />
                )}
              </FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>

    const loginModal =
      <Modal
        visible={this.state.loginVisible}
        onCancel={this.hideLoginModal.bind(this)}
        onOk={this.hideLoginModal.bind(this)}
        cancelText="取消"
      >
        <Tabs type="card">
          <TabPane tab="登录" key="1">
            <Form onSubmit={this.handleLoginSubmit.bind(this)}>
              <FormItem label="学号">
                {getFieldDecorator('l_schoolid')(
                  <Input placeholder="请输入学号" />
                )}
              </FormItem>
              <FormItem label="密码">
                {getFieldDecorator('l_password')(
                  <Input placeholder="请输入密码" type="password" />
                )}
              </FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>


    return (
      <header>
        <Row>
          <Col span={2} />
          <Col span={4}>
            <a href="/" className="logo"><img src="./src/images/logo.png" /></a>
            <span>仲恺校园社团管理系统</span>
          </Col>
          <Col span={16}>

            {userShow}

          </Col>
          <Col span={2} />
        </Row>
        {registerModal}
        {loginModal}
      </header>
    );
  }
}

export default HeaderComponent = Form.create({})(HeaderComponent);