import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './showtable.css';

export default function ShowOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = () => {
      axios
        .get('http://localhost:4066/api/order/get')
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOrders();
  }, []);

  
  
  const handleRowToggle = (e) => {
    e.target.parentElement.nextSibling.classList.toggle('show');
  };

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='m-2'>
            <h1>Orders</h1>
            <button className='btn btn-success'>
            <a href='/orders/add' style={{textDecoration:'none',color:'white'}}>Create A New Order</a></button>
            <br/><br/><br/>
            <table className='table' style={{ borderCollapse: 'collapse' }}>
              <thead className="table-light">
                <tr>
                <th>Order No</th>
                <th>Item Name</th>
                <th>Supplier Name</th>
                <th>Quantity</th>
                <th>Total Cost</th>
                <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment>
                    <tr onClick={handleRowToggle} className='accordion-toggle' key={order._id}>
                      <td>{order.orderNumber}</td>
                      <td>{order.itemName}</td>
                      <td>{order.supplier}</td>
                      <td>{order.quantity}</td>
                      <td>{order.rate*order.quantity}</td>
                      <td>{order.orderStatus}</td>
                    </tr>
                    <tr className='collapse hiddenRow bg-white'>
                      <td colSpan='2' className="fs-6">
                        <div className='accordian-body'><b>Rate : </b>{order.rate}<br/>
                        <b>Category :</b> {order.category}</div>
                      </td>
                      <td colSpan='4' className="fs-6">
                        <div >
                        <b>Order Note :</b> {order.orderNote}</div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
