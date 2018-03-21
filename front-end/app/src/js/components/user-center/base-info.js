import React from 'react';
import { Card } from 'antd';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Radio, message } from 'antd';
import { myfetch } from "../../fetch/myfetch"

import { Upload } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class BaseInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('scm-token'),
      gender: "0",
      campus: "haizhu",
      username: null,
      email: null,
      bio: null,
      imageUrl: null,
      loading: false,
    };
  };
  componentDidMount() {
    myfetch("GET", "http://127.0.0.1:5000/api/v1/user/info" + "?token=" + this.state.token, null).then(
      json => {
        console.log(json);
        this.setState({
          gender: json.user.gender.toString(),
          campus: json.user.campus,
          username: json.user.username,
          email: json.user.email,
          bio: json.user.bio,
          imageUrl: json.user.avatar_path,
        });
      })
  }
  handleSubmit(e) {
    e.preventDefault();
    let formData = this.props.form.getFieldsValue();
    let token = localStorage.getItem('scm-token');
    console.log(formData);
    const fetchOption = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        credentials: "include",
      },
      //mode: "no-cors",
      body: JSON.stringify({
        username: formData.username,
        campus: formData.campus,
        bio: formData.bio,
        gender: formData.gender,
        email: formData.email
      }),
    };
    console.log(fetchOption);

    fetch("http://127.0.0.1:5000/api/v1/user/info" + "?token=" + token, fetchOption).then(response => {
      console.log(response);
      return response.json();
    }).then(
      json => {
        let error = json.error;
        let msg = json.message;
        if (error == "1") {
          message.error(msg);
        } else {
          message.success(msg);
        }
      }
      );

  };
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  render() {
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

    // picture upload 
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;

    return (
      <div>

        <Form onSubmit={this.handleSubmit.bind(this)} layout="horizontal" className="info-form">


          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={"http://127.0.0.1:5000/api/v1/user/avatar" + "?token=" +this.state.token}
            beforeUpload={this.beforeUpload.bind(this)}
            onChange={this.handleChange.bind(this)}
          >
            {imageUrl ? <img src={imageUrl} alt="" width="100px" height="100px" /> : uploadButton}
          </Upload>
          <FormItem>
            {getFieldDecorator('username', { initialValue: this.state.username })(
              <Input placeholder="请输入昵称" className="middle-input" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', { initialValue: this.state.email }, {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input placeholder="请输入电子邮箱" className="middle-input" />
              )}
          </FormItem>

          <FormItem {...formItemLayout}>
            {getFieldDecorator('gender', { initialValue: this.state.gender, })(
              <RadioGroup>
                <Radio value="1">女&nbsp;<Icon type="woman" className="woman" /></Radio>
                <Radio value="2">男&nbsp;<Icon type="man" className="man" /></Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="所在校区" >
            {getFieldDecorator('campus', { initialValue: this.state.campus })(
              <Select style={{ width: 120 }}>
                <Option value="haizhu">海珠</Option>
                <Option value="baiyun">白云</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="个性签名">
            {getFieldDecorator('bio', { initialValue: this.state.bio })(
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