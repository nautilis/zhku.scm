import React from 'react';
import { Row, Col } from 'antd';
const css = require("../../../css/article-index.css")
import { Divider } from 'antd';
import {myfetch} from "../../fetch/myfetch";

export default class ArticleIndex extends React.Component {
    constructor() {
        super();
        this.state = {
            title: null,
            content: null,
            pictures: [],
            createAt: null,
            authorName: null,
        }
    }
    componentWillMount(){
        myfetch("GET", "http://127.0.0.1:5000/api/v1/article/" + this.props.match.params.id, null).then(json =>{
            console.log(json);
            this.setState({
                title: json.article.title,
                content: json.article.content,
                createAt: json.article.date_created,
                authorName: json.article.username,
                pictures: json.article.picture.split("|")
            })
        })
    }
    render() {
        const imgs = []
        for(let i=0; i<this.state.pictures.length;i++){
            imgs.push(<img src={`http://127.0.0.1:5000/static${this.state.pictures[i]}`}/>)
        }
        return (
            <Row>
                <Col span={4} />
                <Col span={16}>
                  <div>
                    <div className="title">
                      <h2>{this.state.title}</h2>
                      <span>{this.state.createAt}</span><span className="author">{this.state.authorName}</span>
                    </div>
                    <Divider className="divider"/>
                    <div className="article-content">
                      <p>{this.state.content}</p>
                    </div>
                    <div className="picture">
                      {imgs}
                    </div>
                  </div>
                </Col>
                <Col span={4} />
            </Row>
        );
    }
}
