const mongoose = require('mongoose');
const paymentsSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },

    Payment_Method:{
        type:String,
        required:true
    },

    Invoice_No:{
        type:String,
        required:true
    },

    Invoice_Date:{
        type:String,
        required:true
    },

    Due_Date:{
        type:String,
        required:true
    },

    Notice:{
        type:String,
        required:true
    }
    
});

module.exports = mongoose.model('payments',paymentsSchema);

