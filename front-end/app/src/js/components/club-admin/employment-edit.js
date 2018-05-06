import React from 'react';
import { Row, Col, } from 'antd';
import { upload, message } from 'antd';
import { Form, Icon, Input, Button, Checkbox, DatePicker} from 'antd';
import { myfetch } from '../../fetch/myfetch'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;

class EmploymentEdit extends React.Component{
    constructor(){
        super();
        this.state={
            token: localStorage.getItem("scm-token"),
            title : "test",
			content: "test",
			deadline: "2018-09-09", 
			interviewTime: "2018-09-09", 
			interviewAddress: "D409",
        }
    }

    componentDidMount(){
        myfetch("GET", `http://127.0.0.1:5000/api/v1/employment/${this.props.match.params.eid}`, null).then(json=>{
            console.log(json)
            this.setState({
                title: json.employment.title,
                content: json.employment.content,
                deadline: json.employment.deadline,
                interviewTime: json.employment.interview_time,
                interviewAddress: json.employment.interview_address,
            })
        })
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
			eid: this.props.match.params.eid,
		}
        console.log(data);
        myfetch("POST", `http://127.0.0.1:5000/api/v1/employment/${this.props.match.params.eid}/update?token=${this.state.token}`, data).then(json=>{
            message.success(json.message);
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
							<Input type="text" placeholder="请输入招聘标题" />
						)}
					</FormItem>
					<FormItem label="内容">
						{getFieldDecorator('content', {initialValue: this.state.content})(
							<TextArea type="text" placeholder="请输入招牌正文..." autosize={{ minRows: 15, maxRows: 30 }} />
						)}
					</FormItem>
					<FormItem label="报名截至日期">
					{getFieldDecorator("deadline", {initialValue: moment(this.state.deadline, "YYYY-MM-DD")})(
						<DatePicker />
        			)}
					</FormItem>
                    <FormItem label="面试时间">
					{getFieldDecorator("interviewTime", {initialValue: moment(this.state.interviewTime, "YYYY-MM-DD")})(
						<DatePicker />
        			)}
					</FormItem>

    				<FormItem label="面试地点">
						{getFieldDecorator('interviewAddress', {initialValue: this.state.interviewAddress})(
							<Input type="text" placeholder="请输入面试地点" />
						)}
					</FormItem>

					<FormItem label="简历文档">
					<Input type="file" />
					</FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
						提交
                    </Button>
				</Form>
			</div>
		);
    }
}

export default EmploymentEdit = Form.create({})(EmploymentEdit)
