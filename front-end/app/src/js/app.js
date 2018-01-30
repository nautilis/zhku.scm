import React from 'react';
import ReactDom from 'react-dom';
import HeaderComponent from './components/header-component';
import TestComponent from './components/test-component';


export default class App extends React.Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <HeaderComponent/>
        <TestComponent/>  
      </div>

    );
  }
}