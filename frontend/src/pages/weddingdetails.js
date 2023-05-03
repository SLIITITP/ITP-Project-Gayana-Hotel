import { useEffect} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


//import WorkoutDetails from "../components/WorkoutDeatils"
import WorkoutDetails from "../components/WorkoutDeatils"
import WorkoutForm from "../components/WorkoutForm"


const Weddingdeatils = () => {
    // eslint-disable-next-line
    const { workouts, dispatch } = useWorkoutsContext()


    useEffect(()=>{
        const fetchWorkouts = async () => {

            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json}) 
            }

        }

        fetchWorkouts()

    }, [dispatch])

    return(
        <div className="home">
          <div className="workouts">
             {workouts && workouts.map(workout => (
                <WorkoutDetails workout={workout} key={workout._id} />
              ))}
          </div>
        </div>
    )
}

export default Weddingdeatils;