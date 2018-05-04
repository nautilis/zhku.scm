import React from 'react';
import { List, Avatar, Button, message } from 'antd';
import {Link} from "react-router-dom";
import { myfetch } from '../../fetch/myfetch';

export default class ActivityApply extends React.Component{
    constructor(){
        super();
        this.state={
            token: localStorage.getItem("scm-token"),
            applies: []
        }
    }

    componentDidMount(){
        myfetch("GET", `http://127.0.0.1:5000/api/v1/apply/activity/${this.props.match.params.acid}?token=${this.state.token}`, null).then(json=>{
            console.log(json)
            this.setState({
                applies: json.applies,
            })
        })
    }

    render(){
        return(
            <List
            dataSource={this.state.applies}
            itemLayout="horizontal"

            renderItem={item=>(
               <List.Item >
               <List.Item.Meta avatar={<Avatar src={item.avatar}/>} 
               title={item.name}
               description={`TEL：${item.phone}`}
               />
               </List.Item>
            )}
            />
        );
    }
}
