const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({

    razonSocial:{
        type:String,
        require: true,
    },

    cuit:{
        type:Number,
        require: true,
        unique:true
    },

    telefono:{
        type:Number,
        require: true
    }



})

module.exports = mongoose.model('Cliente', ClienteSchema);