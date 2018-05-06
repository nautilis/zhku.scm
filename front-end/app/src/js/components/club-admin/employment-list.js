import React from 'react';
import { List, Avatar, Button, message } from 'antd';
import {Link} from "react-router-dom";
import { myfetch } from '../../fetch/myfetch';

export default class EmploymentList extends React.Component{
    constructor(){
        super();
        this.state={
            employments: [],
            token: localStorage.getItem("scm-token"),
        }
    }

    componentDidMount(){
        myfetch("GET", `http://127.0.0.1:5000/api/v1/club/${this.props.match.params.cid}/employments`, null).then(json=>{
            console.log(json)
            this.setState({
                employments: json.employments
            })
        })
    }

    deleteEmployment(eid){
        myfetch("POST", `http://127.0.0.1:5000/api/v1/employment/${eid}/delete`, null).then(json=>{
            message.success(json.message)
            this.componentDidMount();
        })
    }

    render(){
        return(
            <List
            dataSource={this.state.employments}
            itemLayout="horizontal"

            renderItem={item=>(
               <List.Item actions={[<Link to={`${this.props.match.url}/${item.eid}/edit`}><Button type="primary" >编辑</Button></Link>,<a><Button onClick={this.deleteEmployment.bind(this,item.eid)} type="danger" >删除</Button></a>]}>
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
