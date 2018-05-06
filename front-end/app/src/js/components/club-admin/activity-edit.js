import React from 'react';
import { Row, Col, } from 'antd';
import { upload, message } from 'antd';
import { Form, Icon, Input, Button, Checkbox, DatePicker} from 'antd';
import { myfetch } from '../../fetch/myfetch'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;

class ActivityEdit extends React.Component{
    constructor(){
        super();
        this.state={
            token : localStorage.getItem("scm-token"),
            title : "test",
			content: "test",
			deadline: '2015-01-01',
			activityTime: '2018-09-09',
			activityAddress: "D407",
			cid: null, 
        }
    }

    handleSubmit(e){
		e.preventDefault();
		var formData = this.props.form.getFieldsValue();
		let data = {
			title : formData.title,
			content: formData.content,
			deadline: formData.deadline.format("YYYY-MM-DD HH:mm:ss"),
			activityTime: formData.activityTime.format("YYYY-MM-DD HH:mm:ss"),
			activityAddress: formData.activityAddress,
			acid: this.props.match.params.acid,
		}
        console.log(data);
        myfetch("POST", `http://127.0.0.1:5000/api/v1/activity/${this.props.match.params.acid}/update?token=` + this.state.token, data).then(json=>{
			console.log(json);
			message.success(json.message);
		})

    }


    componentDidMount(){
        myfetch("GET", `http://127.0.0.1:5000/api/v1/activity/${this.props.match.params.acid}`, null).then(json=>{
            console.log(json);
            let activity = json.activity;
            this.setState({
                title: activity.title,
                content: activity.content, 
                deadline: activity.deadline,
                activityTime: activity.activity_time,
                activityAddress: activity.activity_address
            })
        })
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
		const { TextArea } = Input;
        return(
            <div>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				    <FormItem label="标题">
						{getFieldDecorator('title', {initialValue: this.state.title})(
							<Input type="text" placeholder="请输入活动标题" />
						)}
					</FormItem>
					<FormItem label="内容">
						{getFieldDecorator('content', {initialValue: this.state.content})(
							<TextArea type="text" placeholder="请输入活动正文..." autosize={{ minRows: 15, maxRows: 30 }} />
						)}
					</FormItem>
					<FormItem label="报名截至日期">
					{getFieldDecorator("deadline", {initialValue: moment(this.state.deadline, "YYYY-MM-DD")})(
						<DatePicker />
        			)}
					</FormItem>
                    <FormItem label="活动时间">
					{getFieldDecorator("activityTime", {initialValue: moment(this.state.activityTime, "YYYY-MM-DD")})(
						<DatePicker />
        			)}
					</FormItem>

    				<FormItem label="活动地点">
						{getFieldDecorator('activityAddress', {initialValue: this.state.activityAddress})(
							<Input type="text" placeholder="请输入活动地点" />
						)}
                    </FormItem>
					<Button type="primary" htmlType="submit" className="login-form-button">
						提交
                    </Button>
				</Form>
            </div>
        )
    }
}

export default ActivityEdit = Form.create({})(ActivityEdit)
