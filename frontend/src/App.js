import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//common component
import Sidenavbar from './component/navbar/sidenavbar'

//category component 
import AddCategory from './component/Category/addCategory'
import ShowCategory from './component/Category/showCategory'
import UpdateCategory from './component/Category/updateCategory'

//item component
import AddItem from './component/Item/addItem'
import ShowItem from './component/Item/showItem'
import UpdateItem from './component/Item/updateItem'

//order componet
import ShowOrders from './component/Order/showorder'
import CreateOrder from './component/Order/createorder'





export const App = () => {
  return (
    <Router>
      <Sidenavbar />
      <div>
        <Routes>
          {/* Common Route */}
          {/* Category Route */}
          <Route path='/category/' exact element={<ShowCategory />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/update/:id" element={<UpdateCategory />} />

          {/* Item Route */}
          <Route path='/item/' exact element={<ShowItem/>}/>
          <Route path='/item/add' element={<AddItem/>}/>
          <Route path='/item/update/:id' element={<UpdateItem/>}/>

          {/*Order Route */}
          <Route path='/orders/' exact element={<ShowOrders/>}/>
          <Route path='/orders/add' exact element={<CreateOrder/>}/>
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
