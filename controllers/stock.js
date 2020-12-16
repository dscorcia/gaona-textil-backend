const express = require ('express');
const {validationResult} = require ('express-validator');
const Cliente   = require('../models/Cliente');
const Stock = require('../models/Stock');
const {_} = require('underscore');



/*CREACION DE STOCK */
const crearStock = async (req,res = express.response)=>{

//     // let {idArticulo, color} = req.body
//     // const stock = await RemitoHilanderia.find({idArticulo,color})

  
//      const clienteVenta = await Cliente.find({nombre:cliente})
  
 try {
//     sotck = await RemitoTintoreria.findOne({nroRemitoTintoreria})
//     if(remito){
//         return res.status(400).json({
//             ok: false,
//             msg:'Ya existe el remito de tintoreria'
//         })
//     }
   

    stock =  new Stock(req.body);

     await stock.save();

     res.status(201).json({
        ok:true,
        msg:'Stock creado',
        idArticulo: stock.idArticulo,
        descripcion: stock.descripcion,
        color: stock.color,
        cantidadKgs: stock.cantidadKgs,
        cantidadPiezas: stock.cantidadPiezas,
        costo: stock.costo,
        subtotalCosto: stock.subtotalCosto,
        fabrica_tintoreria: stock.fabrica_tintoreria,
        empresa: stock.empresa,
        ubicacion: stock.ubicacion
                 
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el stock'
    });
    }

}

module.exports={
    crearStock
}