const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
}, { timestamps: true })

module.exports = mongoose.model('Employee', employeeSchema)

