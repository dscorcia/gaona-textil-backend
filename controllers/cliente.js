
const express = require ('express');
const {validationResult} = require ('express-validator');
const Cliente   = require('../models/Cliente')
const bcrypt = require('bcryptjs');
const {_} = require('underscore');




/*CREACION DE CLIENTE */
const crearCliente = async (req,res = express.response)=>{

    const {cuit} = req.body
try {
    
    let cliente = await Cliente.findOne({cuit})
    if(cliente){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe ese número de Cuit'
        })
    }

     cliente =  new Cliente(req.body);

     await cliente.save();

     res.status(201).json({
        ok:true,
        msg:cliente.id,
        cuit: cliente.cuit,
        razonSocial: cliente.razonSocial,
        telefono: cliente.telefono
                
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el cliente'
    });
    }

}


module.exports={
    crearCliente
}