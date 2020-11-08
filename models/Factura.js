const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacturaSchema = new Schema({

    nroRemito:{
        type:Number,
        required:true,
    },
    
    nroFactura:{
        type: Number,
        require:true,
        unique:true,
    },
    
    articulo:{
        type: Array,    
        require:true,
    },
    fecha:{
        type: Date,
        require:true,
    },
    kgs:{
        type: Number,
        require:true,
    },
    precio:{
        type: Number,
        require:true,
    },
    proveedor:{
        type: String,
        require:true,
    },
    estado:{
        type: String,
        require:true,
    },


});

module.exports = mongoose.model('Factura', FacturaSchema);