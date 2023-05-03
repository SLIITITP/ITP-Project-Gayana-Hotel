// import { useState } from 'react'
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// import { useNavigate } from 'react-router-dom';


// const WorkoutForm = () => {
//   const { dispatch } = useWorkoutsContext()
//   const navigate = useNavigate();                           // add this line to get the navigate function

//   const [title, setTitle] = useState('')
//   const [load, setLoad] = useState('')
//   const [reps, setReps] = useState('')
//   const [count, setcount] = useState('')
//   const [error, setError] = useState(null)
//   const [emptyFields, setEmptyFields] = useState([])

//   const handleSubmit = async () => {
//     //e.preventDefault()

//     const workout = {title, load, reps, count}
    
//     const response = await fetch('/api/workouts', {
//       method: 'POST',
//       body: JSON.stringify(workout),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setError(json.error)
//       setEmptyFields(json.emptyFields)
//     }
//     if (response.ok) {

//       setEmptyFields([])
//       setError(null)
//       setTitle('')
//       setLoad('')
//       setReps('')
//       dispatch({type: 'CREATE_WORKOUT', payload: json})
//       navigate('/weddingdetails'); 
//     }

//   }

//     return (
//         <form className="create" onSubmit={handleSubmit}> 
//             <h3>Add a New Workout</h3>

//             <label>Excersize Title:</label>
//             <input 
//               type="text" 
//               onChange={(e) => setTitle(e.target.value)} 
//               value={title}
//               className={emptyFields.includes('title') ? 'error' : ''}
//             />

//             <label>Load (in kg):</label>
//             <input 
//                type="number" 
//                onChange={(e) => setLoad(e.target.value)} 
//                value={load}
//                className={emptyFields.includes('load') ? 'error' : ''}
//             />

//             <label>Number of Reps:</label>
//             <input 
//                type="number" 
//                onChange={(e) => setReps(e.target.value)} 
//                value={reps} 
//                className={emptyFields.includes('reps') ? 'error' : ''}
//             />
//             <label>count</label>
//             <input 
//                type="number" 
//                onChange={(e) => setcount(e.target.value)} 
//                value={count} 
//                className={emptyFields.includes('count') ? 'error' : ''}
//             />

//             <button>Add Workout</button>
//             <button
//                    onClick={() => navigate("/weddingdetails")}
//                 >
//                    go
//            </button>
//             {error && <div className="error">{error}</div>}
//         </form>
//     )
// }

// export default WorkoutForm

import { useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useNavigate } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const navigate = useNavigate(); // add this line to get the navigate function
  const [emptyFields, setEmptyFields] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [showPopup, setShowPopup] = useState(false)


  const [title, setTitle] = useState('')
  const [load, setLoad] = useState(0)
  const [reps, setReps] = useState(0)
  const [count, setCount] = useState(0)
  const [seating, setseating] = useState(0)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [date, setDate] = useState(0)
  

  const handleSubmit = async () => {
    //e.preventDefault()

    const workout = {title, load, reps, count, seating,date}
    console.log(workout)
    
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {

      setEmptyFields([])
      setError(null)
      setTitle('')
      setLoad(0)
      setReps(0)
      setCount(0)
      setseating(0)
      setDate(0)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
      navigate('/weddingdetails'); 
      setShowPopup(true);
    }

  };
  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value)
  // }

  //const filteredWorkouts = workouts.filter((workout) =>
  //workout.title.toLowerCase().includes(searchQuery.toLowerCase())
  

  const filteredWorkouts = workouts?.filter(
    (workout) =>
    workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchQuery.toLowerCase())
);

  

    return (
      <div>
        {/* Popup message */}
      {showPopup && (
        <div className="popup">
          <p>Details successfully submitted!</p>
        </div>
      )}
      <label htmlFor="">Search:</label>
      <input
        type="text"
        placeholder="Search for anything"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul>
      {/* {filteredWorkouts.map((workout) => (
  <div key={workout.id}>
    <h4>{workout.title}</h4>
    <p>{workout.description}</p> }
  </div>
))*/}

      </ul>
        <form className="create" onSubmit={handleSubmit}> 
            <h3><center><u>Plan Your dream Wedding here!</u></center></h3>
            <label>Available Date:</label>
            <ReactDatePicker
  selected={date}
  onChange={(newDate) => setDate(newDate)}
   excludeDates={[new Date('2023-05-03'), new Date('2023-05-05') , new Date('2023-05-09')]} // set a minimum date to disable past dates
  minDate={new Date()}
/>

            
            <input
            type="text" 
             onChange={(e) => setDate(e.target.value)}
             value={date}
             className={emptyFields.includes('date') ? 'error' : ''}
            
           
            /> 
            

            <label style={{color: 'red'}}>Couple names:</label>
            <input 
              type="text" 
              onChange={(e) => setTitle(e.target.value)} 
              value={title}
              className={emptyFields.includes('title') ? 'error' : ''}
              required // add the required attribute
            />

            <label style={{color: ''}}>Guest count here:</label>
            <input
  type="number"
  onChange={(e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setLoad(value);
    }
  }}
  value={load}
  className={emptyFields.includes('load') ? 'error' : ''}
  required // add the required attribute

/>

              <label>Menu:</label>
              <div class="menu-container">
                  <div class="menu-item">
                    <h6>Menu 1</h6>
                     <p>
                     ֍Mango <br></br>                                           
                     ֍Chicken Sweetcorn <br></br>
                     ֍Steamed Rice <br></br>
                     ֍Wok Fried Egg And Vegetable Fried Rice <br></br>
                     ֍Southern Fish Ambulthiya<br></br>
                     ֍Northern Chicken Curry <br></br>
                     ֍Pork Red Pepper Curry Or Pork Black Pepper Curry <br></br>
                     ֍Tempered Red Dhal Curry <br></br>
                     ֍Fried Mixed Vegetable With Cashew Curry <br></br>
                     ֍Potato Mustard Curry Or Tempered <br></br>
                     ֍Mango Chutney<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                     <b>֍RS.4999/=</b>
                    </p>
                  </div>
                  <div class="menu-item">
                    <h6>Menu 2</h6>
                          <p>
                          ֍ Black Current or Soursop <br></br>                                                                               
                          ֍ Chicken Sweetcorn <br></br>
                          ֍ Steamed Rice <br></br> 
                          ֍ Garlic Hummus With Pita Bread <br></br>
                          ֍ Wok Fried Egg And Vegetable Fried Rice <br></br>
                          ֍ String Hoppers Pilau <br></br>
                          ֍ Southern Fish Ambulthiya <br></br>
                          ֍ Northern Chicken Curry <br></br>
                          ֍ Pork Red Pepper Curry Or Pork Black Pepper Curry <br></br>
                          ֍ Roast Pork Loin (Carving) <br></br>
                          ֍ Tempered Red Dhal Curry  <br></br>
                          ֍ Fried Mixed Vegetable With Cashew Curry  <br></br>
                          ֍ Mustard Curry Or Tempered <br></br>
                          ֍ Mango Chutney <br></br>
                          ֍ Brinjol Moju <br></br><br></br><br></br><br></br>
                          <b>֍RS.5999/=</b>
                          </p>
                  </div>
                  <div class="menu-item">
                    <h6>Menu 3</h6>
                    <p>֍ Black Current or watermelon  <br></br>                                                                             
                      ֍ Chicken Sweetcorn<br></br>
                      ֍ Steamed Rice <br></br>
                      ֍ Garlic Hummus With Pita Bread<br></br>
                      ֍Australian Coleslaw With Crushed Pepper<br></br>
                      ֍ Wok Fried Egg And Vegetable Fried Rice<br></br>
                      ֍ Mixed Seafood rice<br></br>
                      ֍ String Hoppers Pilau<br></br>
                      ֍ Southern Fish Ambulthiya<br></br>
                      ֍ Northern Chicken Curry<br></br>
                      ֍ Pork Red Pepper Curry Or Pork Black Pepper Curry<br></br>
                      ֍ Roast Pork Loin (Carving)<br></br>
                      ֍ Tempered Red Dhal Curry <br></br>
                      ֍ Minute Steak With Pepper Sauce<br></br>
                      ֍ Fried Mixed Vegetable With Cashew Curry <br></br>
                      ֍ Mustard Curry Or Tempered<br></br>
                      ֍ Mango Chutney<br></br>
                      ֍ Brinjol Moju<br></br>
                      <b>֍RS.6999/=</b>
                      </p>
                  </div>
                </div>
             
              <input 
                type="text" 
                onChange={(e) => setReps(e.target.value)} 
                
                value={reps} 
                className={emptyFields.includes('reps') ? 'error' : ''}
                required // add the required attribute
                minLength="3" // add the minLength attribute
                maxLength="50" // add the maxLength attribute
              />
             <label>Dessert:</label>
             <div class="menu-container">
                  <div class="menu-item">
                    <h6>Dessert 1</h6>
                    <p>
                    ֍Dark And White Chocolate Mousse<br></br>
                    ֍ Flavored Swiss Roll With Strawberry Coulis<br></br>
                    ֍ Triple Layer Fruit Mousse <br></br>
                    ֍Paris Sweet Pastries <br></br>
                    ֍ Fresh Fruit Salad In Orange Syrup<br></br><br></br><br></br><br></br><br></br>
                    <b>֍RS.999/=</b>
                    </p>
                      </div>
                  <div class="menu-item">
                    <h6>Deseert 2</h6>
                      <p>
                      ֍Dark And White Chocolate Mousse<br></br>
                      ֍ Cream Caramel <br></br>
                      ֍ Mixed Fruit Jelly Custard <br></br>
                      ֍ Flavored Swiss Roll With Strawberry Coulis<br></br>
                      ֍ Triple Layer Fruit Mousse <br></br>
                      ֍Paris Sweet Pastries<br></br>
                      ֍ Fresh Cut Fruits From The Market <br></br>
                      ֍ Fresh Fruit Salad In Orange Syrup<br></br>
                      ֍ Watalappam FRUITS <br></br>
                      <b>֍RS.1999/=</b>

                      </p>
                  </div>
                 
                </div>
             <input 
              type="text" 
              onChange={(e) => setCount(e.target.value)} 
              value={count} 
              className={emptyFields.includes('count') ? 'error' : ''}
            />
            <label>Seating:</label><center>
            <img src="./IMGS/WeddingSeatingPlan.png" alt="Seating Image" style={{ height: '300px' , width: '65%' }} /></center>
            <input 
              type="text" 
              onChange={(e) => setseating(e.target.value)} 
              value={seating} 
              className={emptyFields.includes('seating') ? 'error' : ''}
              required // add the required attribute
              
            />
        

            <center><button>submit details </button></center><br></br>
            <center><button2
                   onClick={() => navigate("/weddingdetails")}
                >
                   Your Wedding Details Here
            </button2></center>
            {error && <div className="error">{error}</div>}
        </form>
      </div>
    )
}

export default WorkoutForm
