import {useState,useEffect} from 'react'
import React from 'react';
import axios from 'axios'
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatDistanceToNow,format } from 'date-fns'
import './item.css'
import {search}from '../CommonJS/search.js'
//import {useParams} from "react-router-dom";


export default function ShowItem(){
    const[items,setItems]= useState([])
    const[suppliers,setSuppliers]=useState([])
    const[supplier,setsupplier]=useState('')
    const[supplierAddress,setsupplierAddress]=useState('')
    const[supplierContacNo,setsupplierContacNo]=useState('')
    const [successAlert, setSuccessAlert] = useState(false);
 
    
    
   // let{id}= useParams()
    //get all item data function using userEffect
    useEffect(()=>{
        const getItems =()=>{
            axios.get("http://localhost:4066/api/item/get")
            .then((res)=>{
                setItems(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
        getItems()
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
          // Fetch new data and update the state
          fetch("http://localhost:4066/api/supplier/get")
            .then((response) => response.json())
            .then((data) => setSuppliers(data));
        }, 200); // Refresh every 0.2 seconds
    
        return () => clearInterval(interval); // Clean up interval on unmount
      }, []);

   //add supplier function
   function addsupplier(e){
        e.preventDefault()
        const newSupplier = {
            supplier,
            supplierAddress,
            supplierContacNo
        }
        axios
        .post("http://localhost:4066/api/supplier/save", newSupplier)
        .then(() => {
            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false);
                const form = document.querySelector('#dd-supplier-form');
                form.reset();
                const closeButton = document.querySelector('#closebutton');
                closeButton.click();
            }, 2000);
            const form = document.querySelector('#addSupplierForm');
            form.reset();
        })
        .catch((err) => {
            console.log(err);
        });
    }



    //delete item function
    const onDelete=(id)=>{
        axios.delete(`http://localhost:4066/api/item/delete/${id}`)
        .then(()=>{
            setItems(prevItems=>prevItems.filter(item => item._id !==id))
            console.log('Item with id',id,'deleted')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    

    //genarate & downlord qrcode
    function onqr(itemName) {
        const timestamp = new Date().getTime();
        const fileName = `${itemName}-qr-code-${timestamp}.png`;

        QRCode.toCanvas(itemName, { width: 400, height: 400 }, function (error, canvas) {
            if (error) throw error;
            // Append itemName to the canvas
                const ctx = canvas.getContext('2d');
                ctx.font = '24px sans-serif';
                ctx.fillText("ITEM NAME : "+itemName, 10, canvas.height - 10);

                // Download the image
                const link = document.createElement('a');
                link.download = fileName;
                link.href = canvas.toDataURL();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
        });
    }
            

            
    //genrate report for low stock and out of stock
    function downloadPDF() {       
        const filteredItems = items.filter(item => item.quantitiy < 10);
        const columns = ['Item Name', 'Category', 'Quantity', 'Price', 'Supplier', 'Updated At'];
        const rows = filteredItems.map(item => [
            item.itemName,
            item.category,
            item.quantitiy,
            item.price,
            item.supplier,
            format(new Date(item.updatedAt), 'MM/dd/yyyy hh:mm:ss a')
        ]);
              
                
        const pdf = new jsPDF();
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(18);
            pdf.text('Low Stock and Out of Stock Report', 15, 20);
            pdf.setFontSize(12);
            pdf.autoTable({ head: [columns], body: rows, startY: 30 });
              
         const pageCount = pdf.internal.getNumberOfPages();
            pdf.setFontSize(10);
                for (let i = 1; i <= pageCount; i++) {
                    pdf.setPage(i);
                    pdf.text(`Disclaimer: This is a system generated report. For any queries, please contact the IT support.`,pdf.internal.pageSize.getWidth() - 200, pdf.internal.pageSize.getHeight() - 30)
                    pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.getWidth() - 40, pdf.internal.pageSize.getHeight() - 10);
                }
            pdf.setPage(1);
                pdf.save('low-stock-report.pdf');
    }
              
              

    return(
        <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
                        <div className='m-2'>
                            <h1>All Items</h1>
                            <br/>
                            <br/>
                                <div>
                                    
                                    <button className='btn btn-success'>
                                    <a href='/item/add' style={{textDecoration:'none',color:'white'}}>Add New Stock Item</a></button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Add Supplier</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btn btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal1" data-bs-whatever="@getbootstrap">Show Supplier List</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-primary" onClick={downloadPDF}>
                                        <i className="fa fa-download"></i> Low Stock Report Download
                                    </button>
                                </div>
              
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Supplier</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form onSubmit={addsupplier} id='dd-supplier-form'>
                                                    <div className="mb-3">
                                                        <label className="form-label">Supplier Name</label>
                                                        <input type="text" 
                                                            className={`form-control`}
                                                            placeholder='Enter Supplier Name' 
                                                            name='Supplier' 
                                                            onChange={(e) => {
                                                            setsupplier(e.target.value);
                                                            }}
                                                            />   
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Supplier Address</label>
                                                        <textarea className="form-control" 
                                                            rows="3" 
                                                            placeholder='Enter Supplier Address' 
                                                            name='Description'
                                                            onChange={(e) => {
                                                                setsupplierAddress(e.target.value);
                                                            }}
                                                            >
                                                            </textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Supplier Contact No</label>
                                                        <input type="text" 
                                                                className={`form-control`}
                                                                placeholder='Enter Supplier Contact No' 
                                                                name='Supplier' 
                                                                onChange={(e) => {
                                                                    setsupplierContacNo(e.target.value);
                                                                }}
                                                                />   
                                                    </div>  
                                                    <div>
                                                        {successAlert && (
                                                        <div className="alert alert-success" role="alert">
                                                        Supplier added successfully!
                                                        </div>
                                                        )}
                                                                
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id='closebutton'>Close</button>
                                                        <button type="submit" className="btn btn-success" >Add Supplier</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                     <br/>
                                    <br/>
                                    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Supplier List</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body" style={{ overflowY: 'scroll', width: '800px', height: '500px' }}>
                                                {suppliers.map((supplier, index) => (
                                                    <div className="card m-1 rounded" key={index}>
                                                    <div className="card-body">
                                                        <h5 className="card-title bg-warning-subtle text-emphasis-warning rounded">
                                                        <b>{supplier.supplier}</b>
                                                        </h5>
                                                        <h6 className="card-subtitle mb-2 text-body-secondary">Contact No : {supplier.supplierContacNo}</h6>
                                                        <p className="card-text">Address : {supplier.supplierAddress}</p>
                                                        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                                        <button className="btn btn-outline-danger" style={{border:'none'}}> <i className="fa fa-trash-o"></i></button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closebutton">
                                                Close
                                                </button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    <br/>
                                    <br/>

                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
                                    <input type="text" id="myInput" className="form-control" onKeyUp={(search)} placeholder="Search for Stock.."/>
                                </div>
                                <br/>
                                <table id="myTable" className='table'>
                                    <thead className="table-light">
                                        <tr>
                                            <th>Index</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Supplier</th>
                                            <th>Action</th>
                                            <th>Last Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={8}>
                                                <h4 className='mb-3 text-center'><b>Low Stock & Out of Stock</b></h4>
                                            </td>
                                        </tr>

                                        {items.filter(item => item.quantitiy < 10)
                                        .map((item, index) => (
                                        <tr key={item._id} className='bg-dark text-white'>
                                            <td>{index+1}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.category}</td>
                                            <td className={item.quantitiy === 0 ? 'out-of-stock ' : 'text-warning bg-dark'}>
                                                {item.quantitiy === 0 ? 'Out of stock' : 'Low Stock'}
                                            </td>
                                            <td>{item.price}</td>
                                            <td>{item.supplier}</td>
                                            <td>
                                                <a className="btn btn-warning text-decoration-none" href={'/item/update/' + item._id}>&nbsp;&nbsp;
                                                <i className="fa-solid fa-pen-to-square"></i>&nbsp;Edit&nbsp;</a>
                                                &nbsp;&nbsp;
                                                <button className="btn btn-danger" onClick={() => onDelete(item._id)}>&nbsp;&nbsp;
                                                <i className="fa-sharp fa-solid fa-trash"></i>Delete
                                                </button>
                                                &nbsp;&nbsp;
                                                <button className="btn btn-secondary" onClick={() => onqr(item.itemName)}>
                                                <i className="fa fa-qrcode"></i>
                                                </button>

                                            </td>
                                            <td>{formatDistanceToNow(new Date(item.updatedAt),{addSuffix:true})}</td>
                                        </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={8}>
                                            <hr className='border border-danger border-2 opacity-50'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={8}>
                                            <h4 className='mb-3 text-center'><b>Normal Stock</b></h4>
                                            </td>
                                        </tr>

                                        {items.filter(item => item.quantitiy >= 10)
                                        .map((item, index) => (
                                            <tr key={item._id}>
                                                <td>{index+1}</td>
                                                <td>{item.itemName}</td>
                                                <td>{item.category}</td>
                                                <td className={item.quantitiy === 0 ? 'out-of-stock' : ''}>
                                                    {item.quantitiy === 0 ? 'Out of stock' : item.quantitiy}
                                                </td>
                                                <td>{item.price}</td>
                                                <td>{item.supplier}</td>
                                                <td>
                                                    <a className="text-decoration-none btn btn-warning" href={'/item/update/' + item._id}>&nbsp;&nbsp;
                                                    <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>
                                                    &nbsp;&nbsp;
                                                    <button className="btn btn-danger" onClick={() => onDelete(item._id)}>&nbsp;&nbsp;
                                                    <i className="fa-sharp fa-solid fa-trash"></i>Delete
                                                    </button>
                                                    &nbsp;&nbsp;
                                                    <button className="btn btn-secondary" onClick={() => onqr(item.itemName)}>
                                                    <i className="fa fa-qrcode"></i>
                                                    </button>
                                                </td>
                                                <td>{formatDistanceToNow(new Date(item.updatedAt),{addSuffix:true})}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            <div
                                style={{
                                    margin: 'auto',
                                    width: '400px'
                                }}>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}