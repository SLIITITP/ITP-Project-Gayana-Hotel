import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddMenu from './components/menu/AddMenu';
import Menu_Details from './components/menu/Menu_Details';
import Edit_Menu from './components/menu/Edit_Menu'

import Sidenavbar from './components/navbar/sidenavbar'


class App extends Component{
  render(){
    return(
      <Router>
        <Sidenavbar/> {/* Create navbar */}
        <div style = {{backgroundColor:'#e0f6fc',  margin:"0"}}>
        

          <Route path="/AddMenu" exact component={AddMenu}></Route> 
          <Route path="/Menu_Details" exact component={Menu_Details}></Route>      
          <Route path="/Edit_Menu/:id" exact component={Edit_Menu}></Route>  

          <div style={{paddingTop:'0px',width:'100%'}}>
          
          </div>
        </div>
      </Router>
    )
  }
}
export default App;
