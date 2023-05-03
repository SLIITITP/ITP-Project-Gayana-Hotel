import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Shows details of all recipe...
 class Payment_Details extends Component{
  constructor(props){
  super(props);

  this.state={
    posts:[]
  };
}
componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
  axios.get("/payments_Details").then(res =>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });
      console.log(this.state.posts)
    }
  });
}

onDelete=(id)=>{
  if (window.confirm('Are you sure?')) {
  axios.delete(`/payments_Details/delete/${id}`).then((res)=>{
    alert("Delete Successfully !");
    this.retrievePosts();
  })
}}


filterData(posts,searchKey){
  const result =posts.filter((post)=>
  post.Name.includes(searchKey) || post.Name.toLowerCase().includes(searchKey) ||
  post.Invoice_No.includes(searchKey) || post.Invoice_No.toLowerCase().includes(searchKey) ||
  post.Invoice_Date.includes(searchKey) || post.Invoice_Date.toLowerCase().includes(searchKey))
  this.setState({posts:result})
}

handleSearchArea =(e) =>{
  const searchKey=e.currentTarget.value;

  axios.get("payments_Details").then(res =>{
    if(res.data.success){

      this.filterData(res.data.existingPosts,searchKey)
    }
  });
}


//pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPDF('p','pt');

  doc.text(210,30,"payments Details")
  doc.autoTable({  html:'#my-table' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("payments Details.pdf");
}

render(){
    return (
      <div className='container dashboard'>
      <div className='dashboard-app'>
          <div className='dashboard-content'>
      
      <br/>
      <h1 className="text-center" >Payment Bill Details</h1> <br/>
      
      
      <div className = "row" style={{marginLeft:"40px", marginRight:"63px"}} >
        
            
      <div className = "" >
        &nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-success" variant = "primary"> <a href="/AddPayment" style={{textDecoration:'none',color:'white'}}>
          Create New Payments </a></button><br/><br/>
        
        </div > 
           <div> 
          <div className = "">
          <input className="form-control"
          type="search"
          placeholder="Search Name/Mobile No./Del.Date"
          namr="searchQuery"
          onChange={this.handleSearchArea}>
          </input> &nbsp;&nbsp;&nbsp;</div > </div>

      
      <table class="table" id="my-table" className="table" > 
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Invoicec No.</th>
            <th scope="col">Invoice Date</th>
            <th scope="col">Due Date</th>
            <th scope="col">Notice</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.posts.map((posts,index)=>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  <div href={`/payments_Details/${posts._id}`} style={{textDecoration:'none'}}>
                  {posts.Name}
                  </div>
                  </td>
                  <td>{posts.Payment_Method}</td>
                  <td>{posts.Invoice_No}</td>
                  <td>{posts.Invoice_Date}</td>
                  <td>{posts.Due_Date}</td>
                  <td>{posts.Notice}</td>
                <td>
                  {/* Edit button */}

                  <a className="btn btn-warning" style={{width:'100px',height:'40px' }}   href={`/Edit_Payment/${posts._id}`}>
                    <i className="fas fa-edit"></i>&nbsp; Edit
                    </a>
                  </td>
                  <td>

                  {/* Delet button */}

                  <a className="btn btn-danger" style={{width:'100px',height:'40px' }}   href="#" onClick={()=>this.onDelete(posts._id)}>
                    <i className="fa fa-trash"></i>&nbsp; Delete
                    </a>
                  
                </td>
              </tr>
            )) }
        </tbody>
      </table>
      <div/>

      <div>
        <button onClick={this.jsPdfGenerator} type="button" class="btn btn-primary btn-sm"><i class="fa fa-download"></i> &nbsp;&nbsp;&nbsp;&nbsp;Download PDF&nbsp; &nbsp;&nbsp;&nbsp;</button>
        
        </div > 
      
      <br/><br/></div>
      </div>
      </div>
      </div>
  
    
    )
  }
}
export default Payment_Details;
