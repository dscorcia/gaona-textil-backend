const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rHilanderiaSchema = new Schema({


    remitoHilanderia:{
        type:Number,
        require: true
    },

  
   articulos:[{
       idArticulo:{type:String,require: true},
       descripcion:{type:String,require: true},
       cantidadKgs:{type:Number,require: true},
       cantidadPiezas:{type:Number,require: true},
       color:{type:String,require: true}
   }], 

    fecha:{
        type:Date,
        required:true
    },

    nroFactura:{
        type:Number,
        required:false
    }
    
})

module.exports = mongoose.model('RemitoHilanderia', rHilanderiaSchema);