import React from 'react';
import { Row, Col } from 'antd';
const css = require("../../../css/article-index.css")
import { Divider } from 'antd';
import {myfetch} from "../../fetch/myfetch";
import {Link} from "react-router-dom"
import NewApply from "../apply/new-apply";

export default class ShowActivity extends React.Component{
    constructor(){
        super();
        this.state = {
            title: "珠海骑行",
            createAt: "2018-09-09",
            clubName: "网络中心",
            content: "来踩单车啊",
            deadline: "2018-09-08",
            activityTime: "2018-09-09",
            activityAddress: "珠海",

        }
    }

    componentDidMount(){
        myfetch("GET", "http://127.0.0.1:5000/api/v1/activity/" + this.props.match.params.id, null).then(json =>{
            console.log(json);
            this.setState({
                title: json.activity.title,
                content: json.activity.content,
                createAt: json.activity.date_created,
                clubName: json.activity.clubName,
                deadline: json.activity.deadline,
                activityTime: json.activity.activity_time,
                activityAddress: json.activity.activity_address,
                cid: json.activity.cid,
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
                  <span>活动时间：</span><span>{this.state.activityTime}</span>
                </div>
                <div className="interview-address">
                  <span>活动地点：</span><span>{this.state.activityAddress}</span>
                </div>
                <div className="apply" >
                  <NewApply eid={this.props.match.params.id} 
                  type="activity" 
                  clubid={this.state.cid}
                  activityid ={this.props.match.params.id}/>
                </div>
              </div>
            </Col>
            <Col span={4} />
        </Row>
        );
    }
}
