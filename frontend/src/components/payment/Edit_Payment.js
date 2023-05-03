import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class Edit_Payment extends Component{

// Make changes to the post
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
    const id = this.props.match.params.id;

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
    /// Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(Name.length === 0  || Payment_Method.length === 0 || Invoice_No.length === 0 || Invoice_Date.length === 0 || Due_Date.length === 0 ||Notice.length === 0 ){
        swal(" Fields Cannot empty !","Please enter all data !", "error");
      }else if(Name.length < 4 ){
        swal("Invalid  Name !", "Length shuld be greater than 4 !", "error");
      }else if(Invoice_No.length <8 ){
        swal("Invalid Invoice No !", "Length shuld be greater than 4 !", "error");
      }else if(Payment_Method.length < 4 ){
          swal("Invalid Payment Method !", "Length shuld be greater than 4 !", "error");
      }
    else{

      axios.put(`/payments_Details/update/${id}`,data).then((res) =>{
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
    swal({
      title: "Done!",
      text: "Update Successful",
      icon: "success",
      button: "Okay!"
  })
  .then((value) => {
      window.location = '/Payment_Details'; // 
  });}
  }


  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/payments_Details/${id}`).then((res) =>{

      if(res.data.success){
        this.setState({
         
          Name:res.data.post.Name,
          Payment_Method:res.data.post.Payment_Method,
          Invoice_No:res.data.post.Invoice_No,
          Invoice_Date:res.data.post.Invoice_Date,
          Due_Date:res.data.post.Due_Date,
          Notice:res.data.post.Notice

        });

        console.log(this.state.post);
      }
    })

  }

  render() {
    const { Payment_Method } = this.state;
    return (
    <div>
      <div className style={{ backgroundColor:'#F1F1F1', backgroundSize: 'cover'}}> <br/>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="text-center" >  Edit Payment Details  </h1> 
          <br/>
          <form className="needs-validation" noValidate style={{backgroundColor: "#e0f6fc", 
          }}>
          <br/><br/>

            <div className="form-group" style={{marginLeft:"100px", marginRight:"100px"}}>
              <label style={{marginBottom:'5px'}} ><strong>Customer Name :</strong>*</label>
              <input type="text"
              className="form-control"
              name="Name"
              placeholder="Enter  Name"
              value={this.state.Name}
              style={{backgroundColor: "#ffff", marginTop:"10px",}}
              onChange={this.handleInputChange}/>
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
              &nbsp; Update      
              </button>&nbsp;
            <a href="/Payment_Details"><button type="button" style={{marginTop:'15px'}} onClick={this.onClick} class="btn btn-dark"><i class="fa fa-close"></i>&nbsp;Cancel</button></a>
          
            {/* ListRegistration */}
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