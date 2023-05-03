import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// Creating a new recipe...

export default class AddMenu extends Component {

  constructor(props){
    super(props);
    this.state={
        Item_Name:"",
        Price:"",
        Qty:"",
        status:"",
        Tot_Amount:"",
        CreatedAt:""
    }
  }

  handleChange = (event) => {
    this.setState({ status: event.target.value });
  };

  handleInputChange = (e) =>{//if change happens update the change in the state
    const {name,value} = e.target;//form-control variables

    this.setState({
      ...this.state,
      [name]:value
    })

  }

  onSubmit = (e) =>{//save new data to the db

    e.preventDefault();
//destructure state variables
    const {Item_Name,Price,Qty,status,Tot_Amount,CreatedAt} = this.state;

    const data ={
        Item_Name:Item_Name,
        Price:Price,
        Qty:Qty,
        status:status,
        Tot_Amount,Tot_Amount,
        CreatedAt:CreatedAt
    }

    console.log(data)

    // Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(Item_Name.length === 0  || Price.length === 0 || Qty.length === 0 || status.length === 0 || Tot_Amount.length === 0 || CreatedAt.length === 0  ){
      swal(" Fields Cannot empty !","Please enter all data !", "error");
    }else if(Item_Name.length < 4 ){
      swal("Invalid  Name !", "Length shuld be greater than 4 !", "error");
    }
    else{

    axios.post("/menu_Details/save",data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
            Item_Name:"",
            Price:"",
            Qty:"",
            status:"",
            Tot_Amount:"",
            CreatedAt:""
          }
        )
      }
    });
    //pop message 
    swal({ text: "Legal Case Type Successfully Added", icon: "success", button: "Okay!"})
  .then((value) => {
      window.location = '/Menu_Details'; // /ListCustomerRegistration
  });}
  }   

//demo button method
demo =() => { 

  //setState
  this.setState ({
    Item_Name: "Chicken Tikka Kebab"
  })

  this.setState ({
    Price: "1800"
  })

  this.setState ({
    Qty: "10"
  })

  this.setState ({
    status: "on Stock"
  })

  this.setState ({
    Tot_Amount: "100"
  })

}

  render() {
    const { status } = this.state;
    return (
    <div>
      
      <div className style={{ backgroundColor:'#F1F1F1', backgroundSize: 'cover'}}> <br/>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="text-center" > <font face = "Comic sans MS" size ="6" > Add Menu Details </font> </h1> 
          <br/>
          <form className="needs-validation" noValidate style={{backgroundColor: "#e0f6fc", 
          }}>
          <br/><br/>
          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Item_Name :</strong></label>
              <input type="text"
              className="form-control"
              name="Item_Name" 
              placeholder="Enter Item Name"
              value={this.state.Item_Name}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>


          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Price :</strong></label>
              <input type="number"
              className="form-control"
              name="Price" 
              placeholder="Enter Price"
              value={this.state.Price}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Quantity :</strong></label>
              <input type="number"
              className="form-control"
              name="Qty" 
              placeholder="Enter Quantity"
              value={this.state.Qty}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
          <label><strong>Status :</strong></label>
          <div>
          <select value={status} onChange={this.handleChange} style={{backgroundColor: "#ffff", marginTop:"10px",}}>
              <option value="On Stock">On Stock</option>
              <option value="Not Available">Not Available</option>
            </select>
         </div>
         </div>
         <br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Total Amount:</strong></label>
              <input type="number"
              className="form-control"
              name="Tot_Amount" 
              placeholder="Enter Total Amount"
              value={this.state.Tot_Amount}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Created At:</strong></label>
              <input type="Date"
              className="form-control"
              name="CreatedAt" 
              placeholder="Enter Date"
              value={this.state.CreatedAt}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",}} />
          </div><br/>

          

          <div className="text-center" > 
          <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Save
            </button>&nbsp;
          <a href="/CardDetails"><button type="button" style={{marginTop:'15px'}} onClick={this.onClick} class="btn btn-warning"><i class="fa fa-close"></i>&nbsp;Cancel</button></a>
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


