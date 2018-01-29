import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

export default class Index extends React.Component{
  render(){
    return(
      <App>
      </App>
    )
  }
}

ReactDom.render(<Index/>, document.getElementById("root"));