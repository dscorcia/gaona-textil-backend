const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockSchema = new Schema({


    idArticulo:{
        type:String,
        require: true
    },

  
    descripcion:{
        type:String,
        required:true
    },

    color:{
        type:String,
        required:false
    },

    cantidadKgs:{
        type:Number,
        required:false
    },

    cantidadPiezas:{
        type:Number,
        required:false
    }
    
    
})

module.exports = mongoose.model('Stock', StockSchema);