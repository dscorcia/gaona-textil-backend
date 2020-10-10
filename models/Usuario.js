const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    
    
    name:{
        type:String,
        require: true,
        unique: true
    },
    nombre:{
        type:String,
        require:true
    },
    apellido:{
        type:String,
        require:true
    },
    dni:{
        type:Number,
        require:true
    },
    password: {
        type: String,
        require: true
    }
   

});

module.exports = mongoose.model('Usuario', UsuarioSchema);

