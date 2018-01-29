import React from 'react';
import ReactDom from 'react-dom';
import HeaderComponent from './components/header-component';


export default class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
        <HeaderComponent/>

    );
  }
}