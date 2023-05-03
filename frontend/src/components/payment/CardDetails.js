import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Shows details of all recipe...
 class CardDetails extends Component{
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
  axios.get("/card_Details").then(res =>{
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
  axios.delete(`/card_Details/delete/${id}`).then((res)=>{
    alert("Delete Successfully !");
    this.retrievePosts();
  })
}}


filterData(posts,searchKey){
  const result =posts.filter((post)=>
  post.card_No.includes(searchKey) || post.card_No.toLowerCase().includes(searchKey) ||
  post.card_Holder.includes(searchKey) || post.card_Holder.toLowerCase().includes(searchKey) ||
  post.Date.includes(searchKey) || post.Date.toLowerCase().includes(searchKey))
  this.setState({posts:result})
}

handleSearchArea =(e) =>{
  const searchKey=e.currentTarget.value;

  axios.get("card_Details").then(res =>{
    if(res.data.success){

      this.filterData(res.data.existingPosts,searchKey)
    }
  });
}


//pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPDF('p','pt');

  doc.text(210,30,"Card Details")
  doc.autoTable({  html:'#my-table' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("Card Details.pdf");
}

render(){
    return (
      <div className='container dashboard'>
      <div className='dashboard-app'>
          <div className='dashboard-content'>
      
      <br/>
      <h1 className="text-center" > Card Details </h1> <br/>
      
      
      <div className = "row" style={{marginLeft:"40px", marginRight:"63px"}} >
        
            
      <div className = "" >
        &nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-success" variant = "primary"> <a href="/AddCard" style={{textDecoration:'none',color:'white'}}>
          Add New Card Details </a></button><br/><br/>
        
        </div > 
          <div>  
          <div className = "">
          <input className="form-control"
          type="search"
          placeholder="Search Card Number/Card Holder Name/Date"
          namr="searchQuery"
          onChange={this.handleSearchArea}>
          </input> &nbsp;&nbsp;&nbsp;</div > </div>

      
      <table class="table" id="my-table"> 
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col"><br/>Payment Methods<br/></th>
            <th scope="col">Card Number</th>
            <th scope="col"><br/>Card Holder Name<br/></th>
            <th scope="col"><br/>Expiry Date<br/></th>
            <th scope="col"><br/>Date<br/></th>
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
                  <div href={`/card_Details/${posts._id}`} style={{textDecoration:'none'}}>
                  {posts.method}
                  </div>
                  </td>
                  <td>{posts.card_No}</td>
                  <td>{posts.card_Holder}</td>
                  <td>{posts.Expiry_date}</td>
                  <td>{posts.Date}</td>
                <td>
                  {/* Edit button */}
                  <a className="btn btn-warning" style={{width:'100px',height:'40px' }}   href={`/Edit_Card/${posts._id}`}>
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

        <button onClick={this.jsPdfGenerator} type="button" class="btn btn-primary btn-sm"><i class="fa fa-download"></i>&nbsp;&nbsp;&nbsp;&nbsp;Download PDF&nbsp; &nbsp;&nbsp;&nbsp;</button>
        
        </div > 
      
      <br/><br/></div>
      </div>
      </div>
      </div>
    )
  }
}
export default CardDetails;
