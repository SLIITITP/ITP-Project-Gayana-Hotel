import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class Edit_Card extends Component{

// Make changes to the post
  constructor(props){
    super(props);
    this.state={
        method:"",
        card_No:"",
        card_Holder:"",
        Expiry_date:"",
        Date:""
    }
  }

  handleChange = (event) => {
    this.setState({ method: event.target.value });
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

    const {method,card_No,card_Holder,Expiry_date,Date} = this.state;

    const data ={
        method:method,
        card_No:card_No,
        card_Holder:card_Holder,
        Expiry_date:Expiry_date,
        Date:Date
    }
 
    console.log(data)
    /// Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(method.length === 0  || card_No.length === 0 || card_Holder.length === 0 || Expiry_date.length === 0 || Date.length === 0  ){
      swal(" Fields Cannot empty !","Please enter all data !", "error");
    }else if(method.length < 4 ){
      swal("Invalid  Name !", "Length shuld be greater than 4 !", "error");
    }else if(card_No.length <6 ){
      swal("Invalid Card Number !", "Length shuld be greater than 4 !", "error");
    }else if(card_Holder.length < 4 ){
        swal("Invalid Card Holder Name!", "Length shuld be greater than 4 !", "error");
    }else if(Expiry_date.length < 5 ){
        swal("Invalid Expiry Date!", "Length shuld be greater than 4 !", "error");
    }
    else{

      axios.put(`/card_Details/update/${id}`,data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
           method:"",
        card_No:"",
        card_Holder:"",
        Expiry_date:"",
        Date:""
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
      window.location = '/CardDetails'; // 
  });}
  }


  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/card_Details/${id}`).then((res) =>{

      if(res.data.success){
        this.setState({
         
          method:res.data.post.method,
          card_No:res.data.post.card_No,
          card_Holder:res.data.post.card_Holder,
          Expiry_date:res.data.post.Expiry_date,
          Date:res.data.post.Date

        });

        console.log(this.state.post);
      }
    })

  }

  render() {
    const { method } = this.state;
    return (
    <div>
      <div className style={{ backgroundColor:'#F1F1F1', backgroundSize: 'cover'}}> <br/>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="text-center" >Edit Card Details</h1> 
          <br/>
          <form className="needs-validation" noValidate style={{backgroundColor: "#e0f6fc", 
          }}>
          <br/><br/>

           <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
          <label><strong>Payment Methods :</strong></label>
          <div>
          <select value={method} onChange={this.handleChange}>
              <option value="">Select s Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Debit cards">Debit cards</option>
              <option value="Credit cards">Credit cards</option>
              <option value="Mobile payments">Mobile payments</option>
            </select>
         </div>
         </div>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Card Number :</strong></label>
              <input type="number"
              className="form-control"
              name="card_No" 
              placeholder="xxxx xxxx xxxx xxxx"
              value={this.state.card_No}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>


          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Card Holder :</strong></label>
              <input type="text"
              className="form-control"
              name="card_Holder" 
              placeholder="Enter Card Holder Name"
              value={this.state.card_Holder}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Expiry Date :</strong></label>
              <input type="Date"
              className="form-control"
              name="Expiry_date" 
              placeholder="Enter Expiry Date"
              value={this.state.Expiry_date}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Date:</strong></label>
              <input type="Date"
              className="form-control"
              name="Date" 
              placeholder="Date"
              value={this.state.Date}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>
            


            <div className="text-center" > 
            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Update      
              </button>&nbsp;
            <a href="/CardDetails"><button type="button" style={{marginTop:'15px'}} onClick={this.onClick} class="btn btn-warning"><i class="fa fa-close"></i>&nbsp;Cancel</button></a>
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