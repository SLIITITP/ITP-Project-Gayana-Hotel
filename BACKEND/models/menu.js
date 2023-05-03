const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({

    Item_Name:{
        type:String,
        required:true
    },

    Price:{
        type:String,
        required:true
    },

    Qty:{
        type:String,
        required:true
    },

    status:{
        type:String,
        required:true
    },

    Tot_Amount:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('menu',menuSchema);

