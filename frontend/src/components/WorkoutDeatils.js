import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useNavigate } from 'react-router-dom';



const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
  const handleClick1 = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
  

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Guest count here - </strong>{workout.load}</p>
      <p><strong>Menu Type - </strong>{workout.reps}</p>
      <p><strong>Desert Type - </strong>{workout.count}</p>
      <p><strong>Seat Arrangments -</strong>{workout.seating}</p>
      <p><strong>Date -</strong>{workout.date}</p>
      <p><strong>Added date-</strong>{workout.createdAt}</p>
      <div className="but"><button style={{ 
  backgroundColor: 'red', 
  color: 'black', 
  padding: '10px 20px', 
  borderRadius: '5px', 
  border: 'none',
  cursor: 'pointer'
}} onClick={handleClick}>Delete</button></div>

      <button style={{ 
  backgroundColor: 'lightGreen', 
  color: 'black', 
  padding: '10px 20px', 
  borderRadius: '5px', 
  border: 'none',
  cursor: 'pointer'
}}onClick={() => navigate(`/update-workout/${workout._id}`)}>Update Details</button>
    
 
    </div>
  )
}

export default WorkoutDetails





