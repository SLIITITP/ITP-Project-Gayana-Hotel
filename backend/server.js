require('dotenv').config()

const express = require('express')
const mongoose= require('mongoose')
const workoutRoutes = require('./routes/workouts')


const app = express()

//middelwre 
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)

mongoose.connect(process.env.MONGO_URL)

    .then(() => {
        app.listen(process.env.PORT, () =>{

            console.log('listing on port ', process.env.PORT)
        })

    })
    
    .catch((error) =>  {

        console.log(error)
    })
