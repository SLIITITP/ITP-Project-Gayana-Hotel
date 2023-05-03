import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
//import { format } from 'date-fns';


export default function UpdateCategory() {
  const navigate = useNavigate();
  const [date, setdate] = useState("");
  const [CusName, setCusName] = useState("");
  const [NoPeople, setNoPeople] = useState("");
  const [RoomType, setRoomType] = useState("");
  const [NoDays, setNoDays] = useState("");
  let { id } = useParams();

  const [errors, setErrors] = useState({});
  

  function validateForm() {
    let formIsValid = true;
    let errors = {};

    if (!date) {
      formIsValid = false;
      errors["date"] = "Please enter Reservation Date";
    }

    if (!CusName) {
      formIsValid = false;
      errors["CusName"] = "Please enter Customer Name";
    }

    
    if (!NoPeople) {
      formIsValid = false;
      errors["NoPeople"] = "Please enter No of people coming";
    }

    if (!RoomType) {
        formIsValid = false;
        errors["RoomType"] = "Please enter Select Room type";
      }
  

    
    if (!NoDays) {
      formIsValid = false;
      errors["NoDays"] = "Please enter No of days stay";
    }

    
    setErrors(errors);
    return formIsValid;
  }

  
  useEffect(() => {
    
    const getReservation = async (id) => { 
     
      try {
        const response = await axios.get(`http://localhost:8000/api/Reservation/get/${id}`)
        
        const reservation = response.data;
       // const formattedDate = format(new Date(reservation.date), 'MM/dd/yyyy'); // format date here
       // setdate(formattedDate);
        setdate(reservation.date);
        setCusName(reservation.CusName);
        setNoPeople(reservation.NoPeople);
        setRoomType(reservation.RoomType);
        setNoDays(reservation.NoDays);
       
      } catch (err) {
        console.log(err);
      }
    };
    getReservation(id);

    console.log(id)
    
    
  }, [id]);

  function updateData(e) {
    e.preventDefault();

    if (validateForm()) {

    const updatedReservation = {
        date,
        CusName,
        NoPeople,
        RoomType,
        NoDays,
    };
    axios
      .put(`http://localhost:8000/api/Reservation/update/${id}`, updatedReservation)

      //console.log(id)
      .then(() => {
        alert("Reservation updated");
        navigate("/Reservation/");
      })
      .catch((err) => {
        console.log(err); 
      });
  }
}

  return (
    <div className='container dashboard'>
                <div className='dashboard-app'>
                    <div className='dashboard-content'>
    <div className="container">
      <h1>Update Reservation</h1>
      <form onSubmit={updateData}>
        <div className="mb-3">
          <label className="form-label">Reservation Date</label>
          <input
            type="Date"
            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
            placeholder="Enter Reservation Type"
            name="date"
            value={date}
            onChange={(e) => {
                setdate(e.target.value);
            }}
            />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>
        <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.CusName ? 'is-invalid' : ''}`}
                  placeholder='Enter Customer Name'
                  name='CusName'
                  value={CusName}
                  onChange={(e) => {
                    setCusName(e.target.value);
                  }}
                />
                {errors.CusName && <div className="invalid-feedback">{errors.CusName}</div>}
              </div>
            
              <div className="mb-3">
                <label className="form-label">No of People</label>
                <input
                  type="number"
                  className={`form-control ${errors.NoPeople ? 'is-invalid' : ''}`}
                  placeholder='Enter No of people'
                  name='locationStorage'
                  value={NoPeople}
                  onChange={(e) => {
                    setNoPeople(e.target.value);
                  }}
                />
                {errors.CusName && <div className="invalid-feedback">{errors.NoPeople}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Room Type</label>
                <input
                  type="text"
                  className={`form-control ${errors.RoomType ? 'is-invalid' : ''}`}
                  placeholder='Enter Room Type'
                  name='RoomType'
                  value={RoomType}
                  onChange={(e) => {
                    setRoomType(e.target.value);
                  }}
                />
                {errors.RoomType && <div className="invalid-feedback">{errors.RoomType}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">No of days you stay</label>
                <input
                  type="Number"
                  className={`form-control ${errors.NoDays ? 'is-invalid' : ''}`}
                  placeholder='Enter No of Days'
                  name='NoDays'
                  value={NoDays}
                  onChange={(e) => {
                    setNoDays(e.target.value);
                  }}
                />
                {errors.NoDays && <div className="invalid-feedback">{errors.NoDays}</div>}
              </div>
        <br />
        <input
          type="submit"
          className="btn btn-outline-success btn-block mt-4"
        />
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}
