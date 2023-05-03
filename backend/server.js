require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const employeeRoutes = require('./routes/employees')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
//app.get('/', (req,res)=>{
  //res.json({mssg:'Welcome to the app'})
//})
app.use('/api/employees', employeeRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('connected to database & listening for requests on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  }) 