import React from 'react';
import { List, Avatar, Button, message } from 'antd';
import {Link} from "react-router-dom";
import { myfetch } from '../../fetch/myfetch';

export default class ActivityList extends React.Component{
    constructor(){
        super()
        this.state={
            activities: [],
            token : localStorage.getItem("scm-token"),
        }
    }

    componentDidMount(){
        myfetch("GET", `http://127.0.0.1:5000/api/v1/activity/club/${this.props.match.params.cid}`, null).then(json=>{
            console.log(json)
            this.setState({
                activities : json.activities,
            })
        })
    }

    deleteActivity(acid){
        console.log(acid)
        myfetch("POST", `http://127.0.0.1:5000/api/v1/activity/${acid}/delete?token=${this.state.token}`, null).then(json=>{
            message.success(json.message);
            this.componentDidMount();
        })
    }

    render(){
        return(
            <List
            dataSource={this.state.activities}
            itemLayout="horizontal"

            renderItem={item=>(
               <List.Item actions={[<Link to={`${this.props.match.url}/${item.acid}/edit`}><Button type="primary" >编辑</Button></Link>,<Link to={`${this.props.match.url}/${item.acid}/applies`} ><Button type="primary" >查看报名</Button></Link>,<a><Button onClick={this.deleteActivity.bind(this,item.acid)} type="danger" >删除</Button></a>]}>
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
