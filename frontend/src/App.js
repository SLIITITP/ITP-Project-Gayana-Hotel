import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//common component
import Sidenavbar from './component/navbar/sidenavbar'



//category component 
import AddVehicle from './component/vehicle/addCategory'
import ShowVehicle from './component/vehicle/showCategory'
import UpdateVehicle from './component/vehicle/updateCategory'

export const App = () => {
  return (
    <Router>
      <Sidenavbar />
      <div>
        <Routes>
          <Route path='/vehicle/' exact element={<ShowVehicle />} />
          <Route path="/vehicle/add" element={<AddVehicle />} />
          <Route path="/vehicle/update/:id" element={<UpdateVehicle />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
