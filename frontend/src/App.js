import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//common component
import Sidenavbar from './component/navbar/sidenavbar'

//Room component 
import AddRoomType from './component/Room/addRoom'
import ShowRoom from './component/Room/showRoom'
import UpdateRoom from './component/Room/updateRoom'

//Reservation component 
import AddReserevation from './component/Reservation/addReservation'
import ShowReservation from './component/Reservation/showReservation'
import UpdateReservation from './component/Reservation/updateReservation'

//item component
import AddItem from './component/Item/addItem'
import ShowItem from './component/Item/showItem'
import UpdateItem from './component/Item/updateItem'

export const App = () => {
  return (
    <Router>
      <Sidenavbar />
      <div>
        <Routes>
          {/* Common Route */}
          {/* Room Route */}
          <Route path='/Room/' exact element={<ShowRoom />} />
          <Route path="/Room/add" element={<AddRoomType />} />
          <Route path="/Room/update/:id" element={<UpdateRoom />} />

          {/* Reservation Route */}
          <Route path='/Reservation/' exact element={<ShowReservation />} />
          <Route path="/Reservation/add" element={<AddReserevation />} />
          <Route path="/Reservation/update/:id" element={<UpdateReservation />} />

          {/* Item Route */}
          <Route path='/item/' exact element={<ShowItem/>}/>
          <Route path='/item/add' element={<AddItem/>}/>
          <Route path='/item/update/:id' element={<UpdateItem/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
