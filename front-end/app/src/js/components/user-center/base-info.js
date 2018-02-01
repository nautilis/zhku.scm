import React from 'react';
import { Card } from 'antd';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class BaseInfo extends React.Component {
  constructor() {
    super();
  };

  handleSubmit(e){
    e.preventDefault();
    var formData = this.props.form.getFieldsValue();
    console.log(formData);

  };
  render() {
    // const formItemLayout = {
    //   labelCol: { span: 6 },
    //   wrapperCol: { span: 14 },
    // };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>

        <Form onSubmit={this.handleSubmit.bind(this)} layout="horizontal" className="info-form">
          <FormItem>
            {getFieldDecorator('username')(
              <Input placeholder="请输入昵称" className="middle-input" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input placeholder="请输入电子邮箱" className="middle-input"/>
              )}
          </FormItem>
          <FormItem {...formItemLayout}>
            {getFieldDecorator('gender')(
              <RadioGroup>
                <Radio value="1">女&nbsp;<Icon type="woman" className="woman" /></Radio>
                <Radio value="2">男&nbsp;<Icon type="man" className="man" /></Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="所在校区" >
            {getFieldDecorator('campus')(
              <Select  style={{ width: 120 }}>
                <Option value="haizhu">海珠</Option>
                <Option value="baiyun">白云</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="个性签名">
            {getFieldDecorator('bio')(
              <TextArea></TextArea>
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" >更新个人资料</Button>
        </Form>

      </div>
    );
  }
}

export default BaseInfo = Form.create({})(BaseInfo);