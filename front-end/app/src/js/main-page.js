import React from 'react';
import { Carousel, Row, Col} from 'antd';
const css = require("../css/main-page.css");

export default class MainPage extends React.Component{
    constructor(){
        super();
        this.state = {
            articles : [],
        }
    }

    render(){
        return(
            <Row>
            <Col span={4}/>
            <Col span={16}>
            <Carousel autoplay>
              <div><h3>1</h3></div>
              <div><h3>2</h3></div>
              <div><h3>3</h3></div>
              <div><h3>4</h3></div>
            </Carousel>
            </Col>
            <Col span={4}/>
          </Row>
        );
    }
}