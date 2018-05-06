import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Upload, message } from 'antd';
import {myfetch} from '../../fetch/myfetch'
const FormItem = Form.Item;

class ArticleEdit extends React.Component{
    constructor(){
        super();
        this.state={
            title: "test",
            content: "test.content",
            cid: null, 
            aid: null,
            token: localStorage.getItem("scm-token"),
        }
    }

    componentDidMount(){
        myfetch("GET", `http://127.0.0.1:5000/api/v1/article/${this.props.match.params.aid}`, null).then(json=>{
            console.log(json);
            this.setState({
                content: json.article.content,
                title: json.article.title,
                aid: json.article.aid,
            })
        })
    }

    handleSubmit(e){
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        let data = {
            title: formData.title,
            content: formData.content,
            aid: this.state.aid,
          };
        console.log(data);
        myfetch("POST", `http://127.0.0.1:5000/api/v1/article/${this.state.aid}/update?token=${this.state.token}`, data).then(json=>{
            message.success(json.message)
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;

        return (
        <div>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem label="标题">
            {getFieldDecorator('title', {initialValue: this.state.title})(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="内容">
            {getFieldDecorator('content', {initialValue: this.state.content})(
              <TextArea type="text"  autosize={{ minRows: 15, maxRows: 30 }} />
            )}
          </FormItem>
          <Input type="file" /><br/>
          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>
        </Form>
        </div>
        );
    }
}

export default ArticleEdit = Form.create({})(ArticleEdit)
