import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Payment_Details from './components/payment/Payment_Details';
import AddPayment from './components/payment/AddPayment';
import Edit_Payment from './components/payment/Edit_Payment';

import AddCard from './components/payment/AddCard';
import CardDetails from './components/payment/CardDetails';
import Edit_Card from './components/payment/Edit_Card'

import Sidenavbar from './components/navbar/sidenavbar'


class App extends Component{
  render(){
    return(
      <Router>
        <Sidenavbar/> {/* Create navbar */}
        <div style = {{backgroundColor:'#e0f6fc',  margin:"0"}}>
        
          
          <Route path="/Payment_Details" exact component={Payment_Details}></Route>
          <Route path="/AddPayment" exact component={AddPayment}></Route>
          <Route path="/Edit_Payment/:id" exact component={Edit_Payment}></Route>

          <Route path="/AddCard" exact component={AddCard}></Route>
          <Route path="/CardDetails" exact component={CardDetails}></Route>
          <Route path="/Edit_Card/:id" exact component={Edit_Card}></Route>
         

          <div style={{paddingTop:'0px',width:'100%'}}>
          
          </div>
        </div>
      </Router>
    )
  }
}
export default App;
