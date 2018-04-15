let css = require("../../../css/user-profile.css")
import React from 'react';
import { myfetch } from "../../fetch/myfetch";
import {
  Col,
  Row,
  Card,
  Button,

} from 'antd';
import {Link} from 'react-router-dom';

export default class UserProfileOverlook extends React.Component{
  constructor(){
    super();
    this.state = {
      user: null,
      clubs: [],
      token: localStorage.getItem("scm-token"),
    }
  }
  
  componentWillMount(){
    myfetch("GET", "http://127.0.0.1:5000/api/v1/user/clubs" + "?token=" + this.state.token, null).then(json =>{
      console.log(json);
      this.setState({
        user: json.user,
        clubs: json.clubs,
      });
    })
  }

  render(){
    const clubs = [];
    const activities = [];
    const recruitments = [];
    let clubLength = this.state.clubs.length > 4 ? 4 : this.state.clubs.length; 
    for(let i=0; i< clubLength;i++){
      clubs.push(
        <div className="card">
              <Card title={this.state.clubs[i].name} extra={<a href={`/#/club/${this.state.clubs[i].cid}`}>More</a>} style={{ width: 300 }} hoverable={true}>
                <p>职位：{this.state.clubs[i].is_admin == "1" ? "管理员" : "社员"}</p>
                <p>{this.state.clubs[i].is_admin == "1" ? <Link to={`/club/${this.state.clubs[i].cid}/admin`}><Button type="primary" >管理</Button></Link> : <Button type="primary" disabled>管理</Button>}</p>
              </Card>
        </div>
      );
    }

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