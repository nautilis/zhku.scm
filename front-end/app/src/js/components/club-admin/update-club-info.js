import React from 'react';
import { myfetch } from "../../fetch/myfetch";
import {
    Form, Input, Tooltip, Icon,
    Cascader, Select, Row, Col, Checkbox,
    Button, AutoComplete, Radio, message
} from 'antd';
import { Upload } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class UpdateClubInfoComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            imageUrl: null,
            loading: false,
            clubname: null,
            chairman: null,
            desc: null,
            address: null,
            token : localStorage.getItem('scm-token'),
        };
    }
    componentWillMount(){
        myfetch("GET", `http://127.0.0.1:5000/api/v1/club/${this.props.cid}`, null).then(json => {
            console.log(json);
            this.setState({
                imageUrl: "http://127.0.0.1:5000/static" + json.club.avatar,
                clubname: json.club.name,
                chairman: json.club.chairman,
                desc: json.club.desc,
                address: json.club.address,
            })
        })
    }
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
    handleSubmit(e) {
        e.preventDefault();
        let formData = this.props.form.getFieldsValue();
        console.log(formData);
        const data = {
            clubname: formData.clubname || "",
            chairman: formData.chairman || "",
            desc: formData.desc || "",
            address: formData.address || "",
        }
        console.log(this.props.cid);
        myfetch("POST", `http://127.0.0.1:5000/api/v1/club/${this.props.cid}?token=${this.state.token}`, data).then(json=>{
            console.log(json);
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
                <Form onSubmit={this.handleSubmit.bind(this)} layout="horizontal" className="info-form">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={`http://127.0.0.1:5000/api/v1/club/picture/${this.props.cid}` + "?token=" + this.state.token}
                        beforeUpload={this.beforeUpload.bind(this)}
                        onChange={this.handleChange.bind(this)}
                    >
                        {imageUrl ? <img src={imageUrl} alt="" width="100px" height="100px" /> : uploadButton}
                    </Upload>
                    <FormItem label="社团名">
                        {getFieldDecorator('clubname', { initialValue: this.state.clubname })(
                            <Input placeholder="请输入社团名字" className="middle-input" />
                        )}
                    </FormItem>
                    <FormItem label="社长">
                        {getFieldDecorator('chairman', { initialValue: this.state.chairman})(
                            <Input placeholder="请输入社长名字" className="middle-input" />
                        )}
                    </FormItem>
                    <FormItem label="活动地点">
                        {getFieldDecorator('address', { initialValue: this.state.address })(
                            <Input placeholder="请输入活动地点" className="middle-input" />
                        )}
                    </FormItem>
                    <FormItem label="社团简介">
                        {getFieldDecorator('desc', { initialValue: this.state.desc })(
                            <TextArea></TextArea>
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit" >更新社团信息</Button>
                </Form>
        );
    }
}

export default UpdateClubInfoComponent = Form.create({})(UpdateClubInfoComponent);