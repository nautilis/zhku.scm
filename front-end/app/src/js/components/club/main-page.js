import React from 'react';
import { Col, Row, Card, } from 'antd';
import { List, Avatar, Icon, } from 'antd';
import { myfetch } from "../../fetch/myfetch";

let css = require("../../../css/club-main-page.css")

export default class ClubMainComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            backGroundPic: "http://127.0.0.1:5000/static/uploads/avatar/EeDjYL8UwQCX4l9k.jpg",
            clubPic: "http://127.0.0.1:5000/static/uploads/club_pictures/0Ii3tZAXCVEQpC4G.jpg",
            clubName: "社团网络中心",
            chairman: "nautilis",
            address: "杨楼409",
            data: [],
            articles: [],
            desc: "汇佳足球社是汇佳校内最大的体育类社团之一，成立以来已有十多年的历史。起初由一群热爱足球的学长组成，是校内一处供所有热爱足球的同学交流的平台。汇佳足球社成立的目标是提高广大同学的足球理论知识以及实战技巧，丰富同学们业余生活时间。"
        }
    }

    componentWillMount() {
        myfetch("GET", `http://127.0.0.1:5000/api/v1/club/${this.props.match.params.cid}/articles`).then(json => {
            const arts = json.articles;
            for(let i=0;i<arts.length;i++){
                arts[i].url = "http://localhost:8080/#/article/" + arts[i].aid;
            }
            console.log(arts);
            this.setState({
                articles: arts,
            });
        });

        myfetch("GET", `http://127.0.0.1:5000/api/v1/club/${this.props.match.params.cid}`, null).then(json=>{
            const club = json.club;
            console.log("clubclubclub");
            console.log(json);
            this.setState({
                clubPic: "http://127.0.0.1:5000/static" + club.avatar,
                clubName: club.name,
                chairman: club.chairman,
                address: club.address,
                desc : club.desc,
            })
        })
    }

    render() {

        const data = this.state.data;

        return (
            <Row>
                <Col span={4} />
                <Col span={16}>
                    <div className="photos">
                        <div className="pic-name">
                            <img className="club-pic" src={this.state.clubPic} width="100" border-radius="50%" />
                            <span> {this.state.clubName}</span>
                        </div>
                    </div>
                    <div className="club-info">
                        <Card title="社团基本信息" style={{ width: 300 }}>
                            <div className="info-item"><strong>社团名：</strong><span>{this.state.clubName}</span></div>
                            <div className="info-item"><strong>社长：</strong><span>{this.state.chairman}</span></div>
                            <div className="info-item"><strong>活动地点：</strong><span>{this.state.address}</span></div>
                            <div className="info-item"><strong>简介：</strong><span>{this.state.desc}</span></div>
                        </Card>
                    </div>
                    <div className="club-articles">
                        <strong>社团消息</strong>
                        <List
                            itemLayout="horizontal"
                            dataSource={this.state.articles}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={this.state.clubPic} />}
                                        title={<a href={item.url}>{item.title}</a>}
                                        description={item.content.substr(0, 144)}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col span={4} />
            </Row>
        )
    }
}
