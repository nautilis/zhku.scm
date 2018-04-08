import React from 'react';
import { Carousel, Row, Col} from 'antd';
const css = require("../css/main-page.css");
import {myfetch} from "./fetch/myfetch";

export default class MainPage extends React.Component{
    constructor(){
        super();
        this.state = {
            articles : [],
        }
    }
    componentWillMount(){
        myfetch("GET", "http://127.0.0.1:5000/api/v1/article/", null).then(json=>{
            console.log(json.articles);
            this.setState({
                articles : json.articles,
            });
            console.log("now articles");
            console.log(this.state.articles);
        });
    }
    render(){
        const articles = this.state.articles;
        const article_list = [];
        for(let i=0;i<articles.length;i++){
            article_list.push(
                <div>
                    
                        <img src={`http://127.0.0.1:5000/static${articles[i].picture}`} height="160px" width="900px" />
                    
                </div>
            )
        }
        
        return(
            
            <Row>
            <Col span={4}/>
            <Col span={16}>
            <Carousel autoplay>
              {article_list}

            </Carousel>
            </Col>
            <Col span={4}/>
          </Row>
        );
    }
}