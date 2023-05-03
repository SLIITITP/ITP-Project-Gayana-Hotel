import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateEmployeeForm from './components/UpdateEmployeeForm';
import Sidenavbar from './components/navbar/sidenavbar';

//pages and components
import Home from './pages/Home'

//import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Sidenavbar/>
      
      <BrowserRouter>
    <div>
       
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
          
          <Route 
              path="/update-employee/:id" 
              element={<UpdateEmployeeForm />} 
            />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
