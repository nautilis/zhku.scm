import React from 'react';
import { List, Avatar, Button, message } from 'antd';
import {Link} from "react-router-dom";
import { myfetch } from '../../fetch/myfetch';

export default class ActivityList extends React.Component{
    constructor(){
        super();
        this.state={
            articles: [],
            token: localStorage.getItem("scm-token"),
        }
    }

    componentDidMount(){
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
    }

    deleteArticle(aid){
        myfetch("POST", `http://127.0.0.1:5000/api/v1/article/${aid}/delete?token=${this.state.token}`, null).then(json=>{
            message.success(json.message)
            this.componentDidMount()
        })

    }

    render(){
        return(
            <List
            dataSource={this.state.articles}
            itemLayout="horizontal"

            renderItem={item=>(
               <List.Item actions={[<Link to={`${this.props.match.url}/${item.aid}/edit`}><Button type="primary" >编辑</Button></Link>,<a><Button onClick={this.deleteArticle.bind(this,item.aid)} type="danger" >删除</Button></a>]}>
               <List.Item.Meta 
               title={item.title}
               description={item.content.substr(0, 40)}
               />
               </List.Item>
            )}
            />
        )
    }
}
