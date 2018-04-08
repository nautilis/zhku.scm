import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Upload, message } from 'antd';
import {myfetch} from '../../fetch/myfetch'
const FormItem = Form.Item;

class CreateArticle extends React.Component{

    constructor(){
        super();
        this.state = {
            pictures : [],
            token : localStorage.getItem("scm-token"),
            pictures: [],
        }
    }

    handleSubmit(e){
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        let data = {
            title: formData.title,
            content: formData.content,
            cid: this.props.match.params.cid,
            picture : this.state.pictures.join("|"),
          };
        console.log(data);
        myfetch("POST", "http://127.0.0.1:5000/api/v1/article/?token=" + this.state.token, data).then(json=>{
            console.log(json);
            message.success(json.message);
        })
    }

    handleUploadFile(e){
        console.log(e);
        const data = new FormData();
        data.append('file', e.target.files[0]);
        console.log(data);

        const fetchOption = {
            method: "POST",
            // headers: {
            //   'content-type': 'multipart/form-data',
            //   credentials: "include",
            // },
            //mode: "no-cors",
            body: data,
          };
        fetch("http://127.0.0.1:5000/api/v1/article/picture?token=" + this.state.token, fetchOption).then(response => response.json()).then(json=>{
            console.log(json);
            this.state.pictures.push(json.location);
        });

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;

        return (
        <div>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem label="标题">
            {getFieldDecorator('title')(
              <Input type="text" placeholder="请输入文章标题" />
            )}
          </FormItem>
          <FormItem label="内容">
            {getFieldDecorator('content')(
              <TextArea type="text" placeholder="请输入文章内容..." autosize={{ minRows: 15, maxRows: 30 }} />
            )}
          </FormItem>
          <Input type="file" onChange={this.handleUploadFile.bind(this)} />
          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form>
        </div>
        );
    }
}

export default CreateArticle = Form.create({})(CreateArticle)