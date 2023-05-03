import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/navbar'
import WorkoutDetails from './components/WorkoutDeatils';
import WorkoutForm from './components/WorkoutForm';
import Weddingdeatils from './pages/weddingdetails';
import UpdateWorkoutForm from './components/UpdateWorkoutForm';
import GraphicalView from './components/graphicalview';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Navbar />
       <div className="pages">
        <Routes>
          <Route
           path="/"
           element={<Home />
          }
          />
        </Routes>
        <Routes>
          <Route
           path="/weddingdetails"
           element={<Weddingdeatils/>
          }
          />
        </Routes>
        <Routes>
          <Route
           path="/WorkoutForm"
           element={<WorkoutForm/>
          }
          />
        </Routes>
        <Routes>
        <Route 
        path="/graphicalview"  element={<GraphicalView/>
      }
      />
      </Routes>
        <Routes>
          
            <Route path="/create-workout" element={<WorkoutForm />} />
            <Route path="/update-workout/:id" element={<UpdateWorkoutForm />} /> {/* add this new route */}
          </Routes>
       </div>
     </BrowserRouter>
    </div>
  );
}
export default App;
