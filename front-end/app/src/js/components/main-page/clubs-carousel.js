import React from 'react';
import { List, Avatar } from 'antd';
import { Carousel, Row, Col, Divider} from 'antd';
let css = require("../../../css/clubs-carousel.css");
import { myfetch } from "../../fetch/myfetch";

export default class ClubsCarousel extends React.Component {
    constructor() {
        super();
        this.state={
            clubs: [],
            divs: [<div></div>,],
            lists: null,
        }
    }

    componentDidMount(){
        myfetch("GET", "http://127.0.0.1:5000/api/v1/club/index", null).then(json=>{
            console.log(json);
            let divs = []
            let lists = []
            let clubs = json;
            let end = clubs.length -1;
            for(let i=0;i<clubs.length; i++){
                lists.push(
                    <li key={i.toString()}>
                    <Avatar  size="large" src={`http://127.0.0.1:5000/static${clubs[i].avatar}`} />
                    <span className="clubname"><a href={`http://localhost:8080/#/club/${clubs[i].cid}`}>{clubs[i].name}</a></span>
                    </li>
                );
                if(i== end){
                    divs.push(
                        <div>
                            <ul>
                                {lists}
                            </ul>
                        </div>
                    );
                }
                if(i % 8 == 0 && i != 0){
                    divs.push(
                        <div>
                            <ul>
                                {lists}
                            </ul>
                        </div>
                    );
                    lists = [];
                }
            }
            console.log(divs);
            this.setState({
                clubs: json,
                divs :divs,
                lists : lists,
            })
        })
        
    }
    render() {
        console.log("xuanranxuanranxuanran");
        console.log(this.state.lists);
        return (
            <Row>
                <div className="clubs">
                    <Carousel>  
                        {this.state.divs}

                    </Carousel>
                </div>
            </Row>
        );
    }
}