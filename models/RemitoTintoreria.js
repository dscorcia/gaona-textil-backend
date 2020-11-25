const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rTintoreriaSchema = new Schema({


    nroRemitoTintoreria:{
        type:Number,
        required:true,
    },
    nroPartida:{
        type:Number,
        required:true
    },
 
    remitoHilanderia:{
        type:Array,
        require: true
    },


    Articulos:[{
        idArticulo:{type:String,require: true},
        descripcion:{type:String,require: true},
        cantidadKgs:{type:Number,require: true},
        cantidadKgsRib:{type:Number,require: true},
        cantidadPiezas:{type:Number,require: true},
        cantidadPiezasRib:{type:Number,require: true},
        color:{type:String,require: true}
    }], 
 
     fecha:{
         type:Date,
         required:true
     },
  
    
})

module.exports = mongoose.model('RemitoTintoreria', rTintoreriaSchema);