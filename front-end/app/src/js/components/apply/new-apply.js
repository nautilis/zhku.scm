import React from 'react';
import { Row, Col } from 'antd';
const css = require("../../../css/article-index.css")
import { Divider } from 'antd';
import {myfetch} from "../../fetch/myfetch";
import {Link} from "react-router-dom";
import { Card } from 'antd';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

class NewApply extends React.Component{
    constructor(){
        super();
        this.state={
            token: localStorage.getItem("scm-token"),
            filePath: null,
        }
    }

    handleSubmit(e){
        e.preventDefault();
		var formData = this.props.form.getFieldsValue();
		let data = {
            employmentid : this.props.eid,
            activityid : this.props.activityid,
            applytype : this.props.type,
            name: formData.name,
            phone : formData.phone,
            filepath: this.state.filePath,
            clubid: this.props.clubid,
        }
        console.log(data)
        myfetch("POST", "http://127.0.0.1:5000/api/v1/apply/?token=" + this.state.token, data).then(json=>{
			console.log(json);
			message.success(json.message);
		})

		this.props.form.resetFields();
    }
    handleUploadFile(e){
        e.preventDefault();
        const data = new FormData();
        data.append('file', e.target.files[0]);

        const fetchOption = {
            method: "POST",
            body: data,
          };
        fetch("http://127.0.0.1:5000/api/v1/apply/upload_file?token=" + this.state.token, fetchOption).then(response => response.json()).then(json=>{
			console.log(json);
			this.setState({
				filePath: json.location,
			})
		});  

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const fileItem = (this.props.type == "employment" ? <FormItem label="上传简历">
                <Input type="file" onChange={this.handleUploadFile.bind(this)} />
            </FormItem> : null)
  
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Card title="报名" bordered={false} >
            <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
              <FormItem label="姓名">
                {getFieldDecorator('name')(
                <Input type="text" />
                )}
              </FormItem>
            <FormItem label="电话">
                {getFieldDecorator('phone')(
                <Input type="text" />
                )}
            </FormItem>
            <br/>
            {fileItem}
            <br/>
            <Button type="primary" htmlType="submit" className="login-form-button">
                提交
            </Button>


            </Form>
            </Card>
            </div>
        )
    }
}
export default NewApply = Form.create({})(NewApply)
