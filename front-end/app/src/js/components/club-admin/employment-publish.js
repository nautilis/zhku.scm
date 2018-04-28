import React from 'react';
import { Row, Col, } from 'antd';
import { upload, message } from 'antd';
import { Form, Icon, Input, Button, Checkbox, DatePicker} from 'antd';
import { myfetch } from '../../fetch/myfetch'
const FormItem = Form.Item;


class EmploymentPublish extends React.Component {
	constructor() {
		super();
		this.state = {
			token : localStorage.getItem("scm-token"),
			resumeFile : null,
		}
	}

	handleSubmit(e){
		e.preventDefault();
		var formData = this.props.form.getFieldsValue();
		let data = {
			title : formData.title,
			content: formData.content,
			deadline: formData.deadline.format("YYYY-MM-DD HH:mm:ss"),
			interviewTime: formData.interviewTime.format("YYYY-MM-DD HH:mm:ss"),
			interviewAddress: formData.interviewAddress,
			resumeFile: this.state.resumeFile,
			cid: this.props.match.params.cid,
		}
		console.log(data);
		myfetch("POST", "http://127.0.0.1:5000/api/v1/employment/?token=" + this.state.token, data).then(json=>{
			console.log(json);
			message.success(json.message);
		})

		this.props.form.resetFields();
		console.log(formData.deadline.format("YYYY-MM-DD HH:mm:ss"));
	}

    handleUploadFile(e){
		e.preventDefault();
        const data = new FormData();
        data.append('file', e.target.files[0]);

        const fetchOption = {
            method: "POST",
            body: data,
          };
        fetch("http://127.0.0.1:5000/api/v1/employment/upload-resume?token=" + this.state.token, fetchOption).then(response => response.json()).then(json=>{
			console.log(json);
			this.setState({
				resumeFile: json.location,
			})
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { TextArea } = Input;
		return (
			<div>
				<Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				    <FormItem label="标题">
						{getFieldDecorator('title')(
							<Input type="text" placeholder="请输入招聘标题" />
						)}
					</FormItem>
					<FormItem label="内容">
						{getFieldDecorator('content')(
							<TextArea type="text" placeholder="请输入招牌正文..." autosize={{ minRows: 15, maxRows: 30 }} />
						)}
					</FormItem>
					<FormItem label="报名截至日期">
					{getFieldDecorator("deadline")(
						<DatePicker />
        			)}
					</FormItem>
                    <FormItem label="面试时间">
					{getFieldDecorator("interviewTime")(
						<DatePicker />
        			)}
					</FormItem>

    				<FormItem label="面试地点">
						{getFieldDecorator('interviewAddress')(
							<Input type="text" placeholder="请输入面试地点" />
						)}
					</FormItem>

					<FormItem label="简历文档">
					<Input type="file" onChange={this.handleUploadFile.bind(this)} />
					</FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
						提交
                    </Button>
				</Form>
			</div>
		);
	}
}
export default EmploymentPublish = Form.create({})(EmploymentPublish)
