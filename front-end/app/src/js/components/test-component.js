import React from 'react';
import {Button} from 'antd';

export default class TestComponent extends React.Component{
  constructor(){
    super();
    var token=localStorage.getItem('scm-token');
    var wrongToken = localStorage.getItem('wrong-token');
    this.state = {
      token: token,
      wrongToken: wrongToken,
    }
  }

  handleClick(){
    var fetchOptions={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: "include",
        Authorization: this.state.token,
      },
    };
    fetch("http://127.0.0.1:5000/api/v1/user/test", fetchOptions).then(response=>{
      return response.json();
    }).then(json=>{
      console.log(json);
      console.log(this.state.wrongToken);
    })
  }

  render(){
    return(
      <div>
        <h1>this is test</h1>
      <Button onClick={this.handleClick.bind(this)}>Test</Button>
      </div>
    );
  }
}