const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rHilanderiaSchema = new Schema({


    remitoHilanderia:{
        type:Number,
        require: true
    },

    ordenNro:{
        type:Number,
        required:true
        
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
    }
    
})

module.exports = mongoose.model('RemitoHilanderia', rHilanderiaSchema);