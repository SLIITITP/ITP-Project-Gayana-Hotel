import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Shows details of all recipe...
 class Menu_Details extends Component{
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
  axios.get("/menu_Details").then(res =>{
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
  axios.delete(`/menu_Details/delete/${id}`).then((res)=>{
    alert("Delete Successfully !");
    this.retrievePosts();
  })
}}

//filtering data based on a search key ,total amount,quantity,item name

filterData(posts,searchKey){
  const result =posts.filter((post)=>
  post.Item_Name.includes(searchKey) || post.Item_Name.toLowerCase().includes(searchKey) ||
  post.Qty.includes(searchKey) || post.Qty.toLowerCase().includes(searchKey) ||
  post.Tot_Amount.includes(searchKey) || post.Tot_Amount.toLowerCase().includes(searchKey))
  this.setState({posts:result})
}

handleSearchArea =(e) =>{
  const searchKey=e.currentTarget.value;

  axios.get("menu_Details").then(res =>{
    if(res.data.success){

      this.filterData(res.data.existingPosts,searchKey)
    }
  });
}


//pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPDF('p','pt');

  doc.text(210,30,"menu Details")
  doc.autoTable({  html:'#my-table' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("menu Details.pdf");
}

render(){
    return (
      <div className='container dashboard'>
      <div className='dashboard-app'>
          <div className='dashboard-content'>
      
      <br/>
      <h1 className="text-center" > <font face = "Comic sans MS" size ="6" > Menu Details</font> </h1> <br/>
      
      
      <div className = "row" style={{marginLeft:"40px", marginRight:"63px"}} >
        
            
      <div className = "" >
        &nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-success" variant = "primary"> <a href="/AddMenu" style={{textDecoration:'none',color:'white'}}>
          Add New Item </a></button>
        
        </div > 
        <div>
          <div className = "">
          <input className="form-control"
          type="search"
          placeholder="Search Item Name/Qty/Total Amount"
          namr="searchQuery"
          onChange={this.handleSearchArea}>
          </input> &nbsp;&nbsp;&nbsp;</div > </div>

      
      <table class="table" id="my-table" > 
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Item Name</th>
            <th scope="col">Item Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Status</th>
            <th scope="col">Total Amount</th>
            <th scope="col">CreatedAt</th>
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
                  <div href={`/menu_Details/${posts._id}`} style={{textDecoration:'none'}}>
                  {posts.Item_Name}
                  </div>
                  </td>
                  <td>{posts.Price}</td>
                  <td>{posts.Qty}</td>
                  <td>{posts.status}</td>
                  <td>{posts.Tot_Amount}</td>
                  <td>{posts.CreatedAt}</td>
                <td>
                  {/* Edit button */}
                  <a className="btn btn-warning" style={{width:'100px',height:'40px' }}   href={`/Edit_Menu/${posts._id}`}>
                    <i className="fas fa-edit"></i>&nbsp; Edit
                  </a>
                  </td>
                  <td>
                  {/* Delete button */}
                  <a className="btn btn-danger" style={{width:'100px',height:'40px' }}   href="#" onClick={()=>this.onDelete(posts._id)}>
                    <i className="fa fa-trash"></i>&nbsp; Delete
                  </a>
                </td>
              </tr>
            )) }
        </tbody>
      </table>
      </div>

      <div>

        <button onClick={this.jsPdfGenerator} type="button" class="btn btn-primary"> &nbsp;&nbsp;&nbsp;&nbsp;Pdf&nbsp; &nbsp;&nbsp;&nbsp;</button>
        
        </div > 
      
      <br/><br/></div>
      </div>
      </div>
      
    )
  }
}
export default Menu_Details;
