import React from 'react';
import { Row, Col } from 'antd';
const css = require("../../../css/article-index.css")
import { Divider } from 'antd';
import {myfetch} from "../../fetch/myfetch";
import {Link} from "react-router-dom"
import NewApply from "../apply/new-apply";

export default class ShowEmployment extends React.Component{
    constructor(){
        super();
        this.state={
            title : "网络中心招聘",
            content: "招聘啦，招聘啦",
            deadline: "2018-09-08",
            interviewTime: "2018-09-09",
            interviewAddress: "刘宇新楼407",
            resumeFile: "http://abc.doc",
            cid: 2,
            clubName: "网络中心",
            createAt: "2018-09-01",
        }

    }

    componentDidMount(){
        myfetch("GET", "http://127.0.0.1:5000/api/v1/employment/" + this.props.match.params.id, null).then(json =>{
            console.log(json);
            this.setState({
                title: json.employment.title,
                content: json.employment.content,
                createAt: json.employment.date_created,
                clubName: json.employment.clubName,
                deadline: json.employment.deadline,
                interviewTime: json.employment.interview_time,
                interviewAddress: json.employment.interview_address,
                resumeFile: "http://127.0.0.1:5000/static" +json.employment.resume_file,
            })
        })
    }

    render () {
        return(
            <Row>
            <Col span={4} />
            <Col span={16}>
              <div>
                <div className="title">
                  <h2>{this.state.title}</h2>
                  <span>{this.state.createAt}</span><span className="author">{this.state.clubName}</span>
                </div>
                <Divider className="divider"/>
                <div className="article-content">
                  <p>{this.state.content}</p>
                </div>
                <div className="dealine-time">
                  <span>报名截至时间：</span><span>{this.state.deadline}</span>
                </div>
                <div className="interview-time">
                  <span>面试时间：</span><span>{this.state.interviewTime}</span>
                </div>
                <div className="interview-address">
                  <span>面试地点：</span><span>{this.state.interviewAddress}</span>
                </div>
                <div className="resume-file">
                  <a href={this.state.resumeFile} >简历模板</a>
                </div>
                <div className="apply" >
                  <NewApply eid={this.props.match.params.id} type="employment" activityid ={null}/>
                </div>
              </div>
            </Col>
            <Col span={4} />
        </Row>
        );
    }
}
