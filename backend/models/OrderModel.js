const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderNumber:{
        type:Number,
        required:true,
        unique:true,
    
    },
    itemName:{
        type:String,
        required:true

    },
    itemDescription:{
        type:String,

    },
   category:{
        type:String,
        required:true
      
    },
    supplier:{
        type:String,
        required:true
    },

    supplierAddress:{
        type:String,
        

    },
    supplierContacNo:{
        type:String,
        

    },
    rate:{
        type:Number,
        required:true

    },
    quantity:{
        type:Number,
        required:true

    },
    orderNote:{
        type:String,
        
    },
    orderStatus:{
        type:String,
        

    }


},
{ timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema) 