 const mongoose = require('mongoose');
const { object } = require('underscore');
 const Schema = mongoose.Schema;

 const VentasSchema = new Schema({

    remitoVenta:{
        type:Number,
        require:true,
        unique:true
    },
    
    fecha:{
        type:Date,
        require:true
    },
    
    cliente:{
        type:String,
        require:true,
    },
    
    Articulos:[{
       idArticulo:{type:Number, require:true},
       descripcion:{type:String, require:true},
       color:{type:String, require:true},
       cantidad:{type:Number, require:true},
       precioKg:{type:Number, require:true},
       subtotalArt:{type:Number, require:true},

    }],

    total:{
        type:Number,
        require:true
    }


 })

 module.exports = mongoose.model('Venta', VentasSchema);