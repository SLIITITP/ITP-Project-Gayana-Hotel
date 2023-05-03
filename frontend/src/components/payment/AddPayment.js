import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// Creating a new recipe...

export default class AddPayment extends Component {

  constructor(props){
    super(props);
    this.state={
        Name:"",
        Payment_Method:"",
        Invoice_No:"",
        Invoice_Date:"",
        Due_Date:"",
        Notice:""
    }
  }

  handleChange = (event) => {
    this.setState({ Payment_Method: event.target.value });
  };
  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })

  }

  onSubmit = (e) =>{

    e.preventDefault();

    const {Name,Payment_Method,Invoice_No,Invoice_Date,Due_Date,Notice} = this.state;

    const data ={
        Name:Name,
        Payment_Method:Payment_Method,
        Invoice_No:Invoice_No,
        Invoice_Date:Invoice_Date,
        Due_Date:Due_Date,
        Notice:Notice
    }

    console.log(data)

    // Validation 

    

    if(Name.length === 0  || Payment_Method.length === 0 || Invoice_No.length === 0 || Invoice_Date.length === 0 || Due_Date.length === 0 ||Notice.length === 0 ){
      swal(" Fields Cannot empty !","Please enter all data !", "error");
    }else if(Name.length < 4 ){
      swal("Invalid  Name !", "Length shuld be greater than 4 !", "error");
    }else if(Invoice_No.length <6 ){
      swal("Invalid Invoice No !", "Length shuld be greater than 4 !", "error");
    }else if(Payment_Method.length < 4 ){
        swal("Invalid Payment Method !", "Length shuld be greater than 4 !", "error");
    }
    else{

    axios.post("/payments_Details/save",data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
            Name:"",
            Payment_Method:"",
            Invoice_No:"",
            Invoice_Date:"",
            Due_Date:"",
            Notice:""
          }
        )
      }
    });
    swal({ text: "Legal Case Type Successfully Added", icon: "success", button: "Okay!"})
  .then((value) => {
      window.location = '/Payment_Details'; // /ListCustomerRegistration
  });}
  }   

//demo button method
demo =() => { 

  //setState
  this.setState ({
    Name: "Hirandi Jayathilaka"
  })

  this.setState ({
    Payment_Method: "Card"
  })

  this.setState ({
    Invoice_No: "1231234"
  })

  this.setState ({
    Invoice_Date: "01/01/2021"
  })

  this.setState ({
    Due_Date: "02/01/2021"
  })

  this.setState ({
    Notice: " "
  })

}

  render() {
    const { Payment_Method } = this.state;
    return (
    <div>
      
      <div className style={{ backgroundColor:'#F1F1F1', backgroundSize: 'cover'}}> <br/>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="text-center" >Add New Payment </h1> 
          <br/>
          <form className="needs-validation" noValidate style={{backgroundColor: "#e0f6fc", 
          }}>
          <br/><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Customer Name :</strong></label>
              <input type="text"
              className="form-control"
              name="CustomerName" 
              placeholder="Enter Customer Name"
              value={this.state.Name}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>


          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
          <label><strong>Payment Methods :</strong></label>
          <div>
          <select value={Payment_Method} onChange={this.handleChange}>
              <option value="">Select s Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Debit cards">Debit cards</option>
              <option value="Credit cards">Credit cards</option>
              <option value="Mobile payments">Mobile payments</option>
            </select>
         </div>
         </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Invoice Number :</strong></label>
              <input type="text"
              className="form-control"
              name="Invoice_No" 
              maxlength = "10"
              placeholder="Enter Invoice Nnumber"
              value={this.state.Invoice_No}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Invoice Date :</strong></label>
              <input type="Date"
              className="form-control"
              name="Invoice_Date" 
              placeholder="Date"
              value={this.state.Invoice_Date}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Due Date :</strong></label>
              <input type="Date"
              className="form-control"
              name="Due_Date" 
              placeholder="Date"
              value={this.state.Due_Date}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Notice :</strong></label>
              <input type="text"
              className="form-control"
              name="Notice" 
              placeholder="Notice"
              value={this.state.Notice}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          


          <div className="text-center" > 
          <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Save
            </button>&nbsp;
          <a href="/Payment_Details"><button type="button" style={{marginTop:'15px'}} onClick={this.onClick} class="btn btn-dark"><i class="fa fa-close"></i>&nbsp;Cancel</button></a>
          {/* /ListCustomerRegistration */}<br/><br/>

          <button type="button" class="btn btn-outline-dark btn-sm" onClick={this.demo} > Demo </button>
          </div>
          <br/>
          
          </form>
          <br/>
          </div>
        </div>
        </div>
    )
   }
}


