const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rTintoreriaSchema = new Schema({


    nroRemitoTintoreria:{
        type:Number,
        required:true,
    },

    remitoHilanderia:{
        type:Number,
        require: true
    },

    remitoTintoreriaAsociados:{
        type:Array,
        required:false
    },

    articulo:{
        type:String,
        require: true,
    },
    descripcion:{
        type:String,
        require: true,
    },

    cantidad:{
        type:Number,
        require: true 
    },

    color:{
        type:String,
        require: true 
    },

    fecha:{
        type:Date,
        required:true
    },

    
    
})

module.exports = mongoose.model('RemitoTintoreria', rTintoreriaSchema);