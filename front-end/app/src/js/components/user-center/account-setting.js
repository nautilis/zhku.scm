import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class AccountSetting extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();
    console.log(formData);
  }
  
  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem label="当前密码">
            {getFieldDecorator('oldpassword')(
              <Input type="password" placeholder="请输入旧密码" className="middle-input"/>
            )}
          </FormItem>
          <FormItem label="新密码">
            {getFieldDecorator('newpassword')(
              <Input type="password" placeholder="请输入新密码" className="middle-input"/>
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form>
      </div>
    );
  }
}

export default AccountSetting = Form.create({})(AccountSetting)