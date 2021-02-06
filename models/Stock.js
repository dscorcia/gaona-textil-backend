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
        required:true
    },

    cantidadKgsTintoreria:{
        type:Number,
        required:true
    },
    cantidadKgsNegocio:{
        type:Number,
        required:true
    },

    cantidadPiezasTintoreria:{
        type:Number,
        required:true
    },
    cantidadPiezasNegocio:{
        type:Number,
        required:true
    },
    costo:{
        type:Number,
        required:true
    },
    subtotalCosto:{
        type:Number,
        required:true
    },
    subtotalCostoTintoreria:{
        type:Number,
        required:true
    },
    fabrica_tintoreria:{
        type:String,
        required:true
    },
    empresa:{
        type:String,
        required:true
    },
    // ubicacion:{
    //     type:String,
    //     required:true
    // }
    

    /* Agregarrrr */
    //costo
    //SubtotalCosto (costo * cantidadKgs)
    //Fabrica-tintoreria
    //Empresa
    //Agregar ubicación (campana, gaona, tejeduria, tintoreria)
})

module.exports = mongoose.model('Stock', StockSchema);