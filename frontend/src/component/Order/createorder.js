import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [orderNumber, setorderNumber] = useState('');
  const [itemName, setitemName] = useState('');
  const [itemDescription, setitemDescription] = useState('');
  const [category, setcategory] = useState('');
  const [supplier, setsupplierName] = useState('');
  // eslint-disable-next-line 
  const [supplierContacNo, setsupplierContacNo] = useState('');
  // eslint-disable-next-line 
  const [supplierAddress, setsupplierAddress] = useState('');
  const [rate, setrate] = useState('');
  const [quantity, setquantity] = useState('');
  const [orderNote, setorderNote] = useState('');
  const [orderStatus] = useState('Admin Appove');
  const [items, setItems] = useState([]);
  
  

  useEffect(() => {
    const getItems = () => {
      axios
        .get('http://localhost:4066/api/item/get')
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getItems();
  }, []);


// eslint-disable-next-line 
  const handleItemChange = (e) => {
    const selectedItem = items.find((item) => item.itemName === e.target.value);
    setitemName(selectedItem.itemName);
    setitemDescription(selectedItem.itemDescription);
    setcategory(selectedItem.category);
    setsupplierName(selectedItem.supplier);
    setrate(selectedItem.price)
   
    

  };
  
  const getOrderNumber = async () => {
    const response = await fetch('http://localhost:4066/api/order/lastNumber');
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const data = await response.json();
    return data;
  };
  

  getOrderNumber()
    .then((data) => {
      setorderNumber(data.lastOrderNumber+1); 
  
    })
    .catch((error) => {
      console.log(error.message);
    });

  function sendData(e) {
    e.preventDefault(e);

    const newOrder = {
      orderNumber,
      itemName,
      itemDescription,
      category,
      supplier,
      supplierAddress,
      supplierContacNo,
      rate,
      quantity,
      orderNote,
      orderStatus,
    };
    console.log(newOrder);
    axios
      .post('http://localhost:4066/api/order/save', newOrder)
      .then(() => {
        alert('Order Created !');
        navigate('/orders/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <h1>Create Order</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Order Number</label>
                <input
                  type="number"
                  className="form-control"
                  name='orderNumber'
                  id='orderNumber'
                  readOnly
                  value={orderNumber}
                  onChange={(e) => {
                    setorderNumber(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Item </label>
                <select
                  className={`form-select`}
                  onChange={(e) => {
                    setitemName(e.target.value);
                    const selectedItem = items.find((item) => item.itemName === e.target.value);
                    if (selectedItem) {
                      setcategory(selectedItem.category);
                      setsupplierName(selectedItem.supplier);
                      setrate(selectedItem.price)
                      setitemDescription(selectedItem.description)
                    }
                  }}
                  value={itemName}
                >
                  <option value="" disabled>Choose...</option>
                  {
                  items.map((item) => (
                    <option key={item.itemName} value={item.itemName}>{item.itemName}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name='category'
                  id='category'
                  readOnly
                  value={category}
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Supplier Name</label>
                <input
                  type="text"
                  className="form-control"
                  name='supplierName'
                  id='supplierName'
                  readOnly
                  value={supplier}
                  onChange={(e) => {
                    setsupplierName(e.target.value);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                    <label className="input-group mb-3">Price(Rs.)</label>
                        <span className="input-group-text">Rs. </span>
                        <input type="number"
                        className={`form-control`}
                        aria-label="Amount (to the nearest dollar)"
                        min="0" 
                        step="0.01"
                        placeholder='Enter Per Item Price' 
                        name='price'
                        value={rate}
                        onChange={(e) => {
                        setrate(e.target.value);
                        }}/>
                    </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name='quantity'
                  id='quantity'
                  min="0"
                  value={quantity}
                  onChange={(e) => {
                    setquantity(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Order Note</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder='Enter order Note'
                  name='orderNote'
                  value={orderNote}
                  onChange={(e) => {
                    setorderNote(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}  