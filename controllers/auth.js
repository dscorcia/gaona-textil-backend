const express = require ('express');
const {validationResult} = require ('express-validator');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');


const crearUsuario = async (req,res = express.response)=>{

    const {name,password,empresa} = req.body
try {
    
    let usuario = await Usuario.findOne({name})
    if(usuario){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe ese nombre de usuario'
        })
    }

     usuario =  new Usuario(req.body);

     //Encriptar contraseña
     const salt = bcrypt.genSaltSync();
     usuario.password = bcrypt.hashSync(password,salt);
    await usuario.save();
         
    res.status(201).json({
        ok:true,
        msg:usuario.id,
        name: usuario.name
        
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el usuario'
    });
    }

}




const loginUsuario = (req,res = express.response)=>{

    const {name,password,empresa} = req.body

    
    res.status(200).json({
        ok:true,
        msg:'Login',
        name,
        password,
        empresa
    })

}


const revalidarToken = (req,res = express.response)=>{

    res.json({
        ok:true,
        msg:'Renew'
    })

}

module.exports ={
    crearUsuario,
    loginUsuario,
    renewToken: revalidarToken
}