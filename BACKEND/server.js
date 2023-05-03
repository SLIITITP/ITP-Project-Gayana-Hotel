const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv')
dotenv.config()
const app = express();

const postRoutesmenu = require('./routes/menu');

app.use(bodyParser.json());
app.use(cors());

app.use(postRoutesmenu);
const PORT =8000;



const DB_URL = process.env.DB_URI;

//connect to db
mongoose.connect(process.env.DB_URL)
    .then(() =>{
        //listen for requests
        app.listen(process.env.PORT,() =>{
        console.log("connected to db ")
    })

    })
    .catch((error) =>{

    })

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});