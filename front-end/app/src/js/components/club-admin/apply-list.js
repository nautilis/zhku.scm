import React from 'react';
import { List, Avatar, Button, message } from 'antd';
import {Link} from "react-router-dom";
import { myfetch } from '../../fetch/myfetch';

export default class ApplyList extends React.Component{
    constructor(){
        super();
        this.state={
            applies : [],
            token : localStorage.getItem("scm-token"),
        }
    }
    handleAccept(apid, index){
        console.log("start accept")
        myfetch("GET", `http://127.0.0.1:5000/api/v1/apply/${apid}/accept?token=${this.state.token}`, null).then(json =>{
            console.log(json);
            message.success(json.message);
        })
    }
    handleReject(apid){
        console.log("start reject")
        myfetch("GET", `http://127.0.0.1:5000/api/v1/apply/${apid}/reject?token=${this.state.token}`, null).then(json =>{
            console.log(json);
            message.success(json.message);
        })

    }

    componentDidMount(){
        myfetch("GET", `http://127.0.0.1:5000/api/v1/apply/club/${this.props.match.params.cid}?token=${this.state.token}`, null).then(json=>{
            console.log(json);
            let applies = [];
            for(let i=0;i<json.applies.length;i++){
                let apply = {
                    apid : json.applies[i].apid,
                    name: json.applies[i].name,
                    phone: json.applies[i].phone,
                    filepath: "http://127.0.0.1:5000/static" + json.applies[i].filepath,
                    uid: json.applies[i].userid,
                    avatar: "http://127.0.0.1:5000/static" + json.applies[i].avatar,
                    index: i,

                }
                applies.push(apply)
            }
            this.setState({
                applies : applies
            })
            console.log(this.state.applies)
        })
    }

    render(){
            return (
            <List
            dataSource={this.state.applies}
            itemLayout="horizontal"

            renderItem={item=>(
               <List.Item actions={[<a href={item.filepath}>简历</a>, <a><Button id={`acccept-button-${item.index}`} onClick={this.handleAccept.bind(this, item.apid, item.index)} type="primary" >录用</Button></a>,<a><Button onClick={this.handleReject.bind(this, item.apid)} type="danger" >拒绝</Button></a>]}>
               <List.Item.Meta avatar={<Avatar src={item.avatar}/>} 
               title={item.name}
               description={item.phone}
               />
               </List.Item>
            )}
            />
        )
    }
}
