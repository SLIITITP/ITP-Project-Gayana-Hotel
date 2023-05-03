import {useState,useEffect} from 'react'
import React from 'react';
import axios from 'axios'
import QRCode from 'qrcode';

import { formatDistanceToNow } from 'date-fns'
import './item.css'
import {search}from '../CommonJS/search.js'

//import {useParams} from "react-router-dom";


export default function ShowItem(){
    const[items,setItems]= useState([])
    
    
    
    //let{id}= useParams()

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

            function handleSubmit(e) {
                e.preventDefault(); 
              
                const categorySelect = document.querySelector('select.form-select');
                const releaseInput = document.querySelector('input.form-control');
                const selectedItem = categorySelect.value;
                const releaseQuantity = Number(releaseInput.value);
              
                console.log(selectedItem)
                // Find the index of the selected item in the items array
                const selectedItemIndex = items.findIndex(item => item.itemName === selectedItem);
              
                if (selectedItemIndex !== -1) {
                  // Create a copy of the items array and update the quantity of the selected item
                  const updatedItems = [...items];
                  updatedItems[selectedItemIndex] = {...updatedItems[selectedItemIndex], quantity: updatedItems[selectedItemIndex].quantity - releaseQuantity};
                  
                  // Update the state with the updated items array
                  setItems(updatedItems);
                 
                }
              }


    return(
        <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
        <div className='m-2'>
            <h1>All Items</h1>
            <br/>
            <button className='btn btn-success'>
            <a href='/item/add' style={{textDecoration:'none',color:'white'}}>Add New Stock Item</a></button>
            <br/>
            <br/>

            <div >
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Stock Release</button>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Stock Release</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Select Category</label>
                                        <select className="form-select" >
                                            {items.map((item, index) => (
                                                <option key={index} value={item.itemName}>{item.itemName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">How many Stock are  release?</label>
                                        <input className="form-control" type='number'/>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Update Stock</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br/><br/>
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
                        <a className="btn btn-success" href={'/item/update/' + item._id}>&nbsp;&nbsp;
                        <i className="fa-solid fa-pen-to-square"></i>&nbsp;Edit&nbsp;</a>
                        &nbsp;&nbsp;
                        <button className="btn btn-warning" onClick={() => onDelete(item._id)}>&nbsp;&nbsp;
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
                        <a className="btn btn-success" href={'/item/update/' + item._id}>&nbsp;&nbsp;
                        <i className="fa-solid fa-pen-to-square"></i>Edit&nbsp;&nbsp;</a>
                        &nbsp;&nbsp;
                        <button className="btn btn-warning" onClick={() => onDelete(item._id)}>&nbsp;&nbsp;
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
        </div>
        </div>
        </div>
        </div>
    )
}