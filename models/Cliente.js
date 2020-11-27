const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({

    razonSocial:{
        type:String,
        require: false
    },

    cuit:{
        type:Number,
        required:false
        
    },

    nombre:{
        type:String,
        require: false,
    },

    telefono:{
        type:Number,
        require: false 
    }

})

module.exports = mongoose.model('Cliente', ClienteSchema);