const Workout = require('../models/WorkoutModel')
const mongoose = require('mongoose')
//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}


//get asingle workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'No such workout'})

    }

    const workout = await Workout.findById(id)

    if(!workout){

        return res. status(404).json({error: 'No such workout'})

    }

    res.status(200).json(workout)
}


//create new workout
const createWorkout = async (req, res) => {
    const {title, load , reps , count ,seating,date} =req.body
    
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (!count) {
    emptyFields.push('count')
  }
  if (!seating) {
    emptyFields.push('seating')
  }
  if(!date){
    emptyFields.push('date')
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
    //add doc to db 

    try{
        const workout = await Workout.create({title, load , reps, count ,seating,date})
        res.status(200).json(workout)

    }catch(error){
        res.status(400).json({error: error.message})

    }
}


//delete a workout
const deleteWorkout = async (req, res) => {

 const { id } = req.params

 if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such workout'})
 }

 const workout = await Workout.findOneAndDelete({_id: id})

 if (!workout) {
    return res.status(404).json({error: 'No such workout'})
 }

 res.status(200).json(workout)

}


//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    )

    if (!workout) {
      return res.status(404).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


module.exports ={
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout 
}
