let css = require("../../../css/user-profile.css")
import React from 'react';
import {
  Col,
  Row,
  Card,
} from 'antd';

export default class UserProfileOverlook extends React.Component{
  constructor(){
    super();
  }
  
  render(){
    const clubs = [];
    const activities = [];
    const recruitments = [];
    for(let i=0;i<4;i++){
      clubs.push(
        <div className="card">
              <Card title="足球社" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                <p>职位：社员</p>
                <p>管理</p>
              </Card>
        </div>
      );
    };
    for(let i=0;i<2;i++){
      activities.push(
        <div className="card">
              <Card title="街舞比赛" extra={<a href="#">More</a>} style={{ width: 300 }} hoverable={true}>
                <p>喵俗喵俗喵俗......</p>
              </Card>
        </div>
      )
    };
    for(let i=0;i<2;i++){
      recruitments.push(
        <div className="card">
          <Card title="青协招聘" extra={<a href="#">More</a>} style={{width: 300}} hoverable={true}>
            <p>描述描述描述</p>
          </Card>
        </div>
      );
    };
    return(
        <Col span={24}>
          <div className="overlook">
            <div className="clubs">
               <div className="title">
                <h2>社团</h2>
               </div>
               <div>
               {clubs}
              </div>
            </div>
            <div className="clean"/>
            <div className="activities">
               <div className="title">
                <h2>活动</h2>
               </div>
               <div>
               {activities}
              </div>
            </div>
            <div className="clean"/>
            <div className="recruitments">
              <div className="title">
                <h2>招聘</h2>
              </div>
              {recruitments}
            </div>
          </div>
        </Col>
    );
  }
}