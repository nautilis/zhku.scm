import React from 'react';
import {
  Col,
  Row,
  Menu,
  Modal,
  Button,
  Tabs,
  Form,
  Input,
  message,
} from 'antd';
var css = require("../../css/header.css")

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class HeaderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      logined: false,
      username: "",
      registerVisible: false,
      loginVisible: false,
    }
  }
  hideRegisterModal(){
    this.props.form.resetFields();
    this.setState({registerVisible: false});
  }

  hideLoginModal(){
    this.setState({loginVisible: false});
  }

  showModal(type){
    console.log("on show modal");
    if(type == "register"){
      this.setState({registerVisible: true});
    }else if (type == "login"){
      this.setState({loginVisible: true});
    }
  }

  handleRegisterSubmit(e){
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();

    console.log(formData);
    var fetchOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      // mode: "no-cors",
      body: JSON.stringify({
        schoolid: formData.schoolid,
        password: formData.password,
      }),
    };

    fetch("http://127.0.0.1:5000/api/v1/user/", fetchOptions).then(response=> {
      return response.json()
    }).then(json=>{
      console.log(json);
      var error = json.error;
      if(error == "1"){
        message.success(json.message);
      }else{
        message.success(json.message);
        this.props.form.resetFields();
        this.setState({registerVisible: false});
      }
    });

    
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const userShow = this.state.logined ?
      <Menu.Item key="logout" className="sign">
        <Link target="_blank">个人中心</Link>
        <Button type="ghost" htmlType="button" >退出</Button>
      </Menu.Item>
      :
      <Menu.Item key="signInUp" className="sign">
        <Button type="primary" htmlType="button" onClick={this.showModal.bind(this, "register")}>注册</Button>
        &nbsp;&nbsp;
      <Button type="primary" htmlType="button">登录</Button>
      </Menu.Item>

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
    console.log(userShow);
    return (
      <header>
        <Row>
          <Col span={2} />
          <Col span={4}>
            <a href="/" className="logo"><img src="./src/images/logo.png" /></a>
            <span>仲恺校园社团管理系统</span>
          </Col>
          <Col span={16}>
            <Menu>
              {userShow}
            </Menu>
          </Col>
          <Col span={2} />
        </Row>
        {registerModal}
      </header>
    );
  }
}

export default HeaderComponent = Form.create({})(HeaderComponent);