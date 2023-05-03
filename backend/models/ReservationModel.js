const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema(
    {

    date:{
        type:String,
        required:true,
    },

    CusName:{
        type:String,
        required:true,
        unique:true
    },
        
    NoPeople:{
        type:Number,
        required:true
    },

    RoomType:{
        type:String,
    },

    NoDays:{
        type:Number,
        required:true
    }
   
    
   
},
{ timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema) 