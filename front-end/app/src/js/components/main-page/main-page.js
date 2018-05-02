import React from 'react';
import { Carousel, Row, Col, Divider, Icon, List, Avatar } from 'antd';
const css = require("../../../css/main-page.css");
import { myfetch } from "../../fetch/myfetch";
import { Link } from 'react-router-dom';
import ClubsCarousel from "./clubs-carousel";

export default class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            clubs : [],
            employments: [],
        }
    }
    componentWillMount() {
        myfetch("GET", "http://127.0.0.1:5000/api/v1/article/", null).then(json => {
            console.log(json.articles);
            this.setState({
                articles: json.articles,
            });
            console.log("now articles");
            console.log(this.state.articles);
        });
        myfetch("GET", "http://127.0.0.1:5000/api/v1/employment/list", null).then(json=>{
            console.log(json.employments);
            this.setState({
                employments: json.employments
            })
        });
    }
    render() {
        const data = this.state.employments;
        let one_activity = {"title": "珠海骑行",
        "avatar": "http://127.0.0.1:5000/static/uploads/club_pictures/RSGTUZHRsA17lgU2.jpg",
        "activityTime": "2018-05-05",
        }
        const activityData = []
        for(let i=0;i<4;i++){
            activityData.push(one_activity); 
        }
        const articles = this.state.articles;
        const article_list = [];
        for (let i = 0; i < articles.length; i++) {
            const picture = articles[i].picture.split("|")[0];
            article_list.push(
                <div>

                    <Link to={`/article/${articles[i].aid}`}>
                        <img src={`http://127.0.0.1:5000/static${picture}`} height="160px" width="900px" />
                    </Link>
                </div>
            )
        }

        return (
            <div>
            <Row>
                <Col span={4} />
                <Col span={16}>
                    <Carousel autoplay>
                        {article_list}

                    </Carousel>
                </Col>
                <Col span={4} />
            </Row>
            <div className="main-content">
            <Row>
                <Col span={4}/>
                <Col span={11}>
                <div className="activity">
                <h3><Icon type="gift" style={{ fontSize: 16, color: '#1890ff' }}/>  活动</h3>
                <div>
                <List
                dataSource={activityData}
                renderItem={item=>(
                    <List.Item>
                   <Link to="#" ><span className="list-span list-avatar"><Avatar src={item.avatar}/></span><span className="list-span list-title">{item.title}</span><span clasName="list-span list-time">{item.activityTime}</span><span className="list-span">  >></span></Link>
                    </List.Item>
                )}
                />
                </div>
                </div>

                <div className="employment">
                <h3><Icon  type="notification" style={{ fontSize: 16, color: '#1890ff' }}/>  招聘</h3>
                <div>
                <List
                dataSource={data}
                renderItem={item=>(
                    <List.Item>
                   <Link to={`/employment/${item.eid}`} ><span className="list-span list-avatar"><Avatar src={item.avatar}/></span><span className="list-span list-title">{item.title}</span><span className="list-span list-time">{item.interview_time}</span><span clasName="list-span">  >></span></Link>
                    </List.Item>
                )}
                />
                </div>
                </div>
                </Col>
                <Col span={5}>
                <div className="clubs-carousel">
                <ClubsCarousel/>
                </div>
                </Col>
                <Col span={4}/>
            </Row>
            </div>
            </div>
        );
    }
}
