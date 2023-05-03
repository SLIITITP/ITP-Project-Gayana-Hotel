const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({

    method:{
        type:String,
        required:true
    },

    card_No:{
        type:String,
        required:true
    },

    card_Holder:{
        type:String,
        required:true
    },

    Expiry_date:{
        type:String,
        required:true
    },

    Date:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('card',cardSchema);

