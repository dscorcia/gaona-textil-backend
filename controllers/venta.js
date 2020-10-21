
const express = require ('express');
const {validationResult} = require ('express-validator');
const Cliente   = require('../models/Cliente');
const Venta = require('../models/Venta');
const {_} = require('underscore');
const {obtenerClientes} = require('../controllers/cliente')



/*CREACION DE VENTA */
const crearVenta = async (req,res = express.response)=>{

    const {remitoVenta, cliente } = req.body
    let  elCliente = obtenerClienteParaVenta(cliente) 
  
try {
    
    let venta = await Venta.findOne({remitoVenta})
    if(venta){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe una venta con ese número de remito de venta'
        })
    }

     venta =  new Venta(req.body);

     await venta.save();

     res.status(201).json({
        ok:true,
        msg:"Venta cargada",
        remitoVenta: venta.remitoVenta,
        fecha: remitoVenta.fecha,
        cliente: elCliente,
        idArticulo: venta.idArticulo,
        descripcion: venta.descripcion,
        color: venta.color,
        cantidad: venta.cantidad,
        precioKg: venta.precioKg,
        subtotalArt: venta.subtotalArt,
        total: venta.total

                       
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó la venta'
    });
    }

}


module.exports={
    crearVenta
}