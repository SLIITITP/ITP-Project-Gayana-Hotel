import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddRoomType() {
  const navigate = useNavigate();
  const [RoomType, setRoomType] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newRoom = {
      RoomType,
      price,
      description
    };
    
 

    axios
      .post("http://localhost:4066/api/Room/save", newRoom)
      .then(() => {
        alert("Room added");
        navigate("/Room/");
      })
      .catch((err) => {
        console.log('having'+err);
      });
  }

  return (
    <div className='container dashboard'>
      <div className='dashboard-app'>
        <div className='dashboard-content'>
          <div className='container'>
            <h1>Add Room Types</h1>
            <form onSubmit={sendData}>
              <div className="mb-3">
                <label className="form-label">Room Type</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter Room Type'
                  name='RoomName'
                  onChange={(e) => {
                    setRoomType(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder='Enter price'
                  name='locationStorage'
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Discription</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder='Enter description'
                  name='RoomNote'
                  onChange={(e) => {
                    setdescription(e.target.value);
                  }}
                />
              </div>
              <br />
              <input type='submit' className='btn btn-outline-success btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
