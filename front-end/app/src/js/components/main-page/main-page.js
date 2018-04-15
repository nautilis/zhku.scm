import React from 'react';
import { Carousel, Row, Col, Divider } from 'antd';
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
    }
    render() {
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
            <Row>
                <Col span={4}/>
                <Col span={5}>
                <div className="clubs-carousel">
                <ClubsCarousel/>
                </div>
                </Col>
                <Col span={4}/>
            </Row>
            </div>
        );
    }
}