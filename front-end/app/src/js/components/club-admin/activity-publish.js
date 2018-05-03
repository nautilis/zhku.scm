import React from 'react';
import { Row, Col, } from 'antd';
import { upload, message } from 'antd';
import { Form, Icon, Input, Button, Checkbox, DatePicker} from 'antd';
import { myfetch } from '../../fetch/myfetch'
const FormItem = Form.Item;

class ActivityPublish extends React.Component{
    constructor(){
        super();
        this.state ={
            token: localStorage.getItem("scm-token")
        }
    }

    handleSubmit(e){
        console.log(this.state.token)
		e.preventDefault();
		var formData = this.props.form.getFieldsValue();
		let data = {
			title : formData.title,
			content: formData.content,
			deadline: formData.deadline.format("YYYY-MM-DD HH:mm:ss"),
			activityTime: formData.activityTime.format("YYYY-MM-DD HH:mm:ss"),
			activityAddress: formData.activityAddress,
			cid: this.props.match.params.cid,
		}
		console.log(data);
		myfetch("POST", "http://127.0.0.1:5000/api/v1/activity/?token=" + this.state.token, data).then(json=>{
			console.log(json);
			message.success(json.message);
		})

		this.props.form.resetFields();
	}

    render(){
        const { getFieldDecorator } = this.props.form;
		const { TextArea } = Input;
        return(
            <div>
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
				    <FormItem label="标题">
						{getFieldDecorator('title')(
							<Input type="text" placeholder="请输入活动标题" />
						)}
					</FormItem>
					<FormItem label="内容">
						{getFieldDecorator('content')(
							<TextArea type="text" placeholder="请输入活动正文..." autosize={{ minRows: 15, maxRows: 30 }} />
						)}
					</FormItem>
					<FormItem label="报名截至日期">
					{getFieldDecorator("deadline")(
						<DatePicker />
        			)}
					</FormItem>
                    <FormItem label="活动时间">
					{getFieldDecorator("activityTime")(
						<DatePicker />
        			)}
					</FormItem>

    				<FormItem label="活动地点">
						{getFieldDecorator('activityAddress')(
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
export default ActivityPublish= Form.create({})(ActivityPublish)
