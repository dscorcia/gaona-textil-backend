
const express = require ('express');
const {validationResult} = require ('express-validator');
const Cliente   = require('../models/Cliente');
const Venta = require('../models/Venta');
const {_} = require('underscore');




/*CREACION DE VENTA */
const crearVenta = async (req,res = express.response)=>{

    const {remitoVenta, cliente } = req.body
    let clienteVenta = await Cliente.findOne({cliente})
    console.log(clienteVenta);
  
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
        cliente: clienteVenta,
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


/*BORRAR VENTA */
const borrarVenta = async(req, res) => {

  
    let remitoVenta = req.params.remitoVenta;
        

    await Venta.deleteOne({remitoVenta}, (err, ventaDeleted) => {
           

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!ventaDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Venta no existe"
                }
            })

        }

        res.json({
            status: 'Venta borrada',
            ok: true,
            nombre: nombre,
            ventaRemito: ventaRemito
        });


    });

}



/*MODIFICAR CLIENTE */

const modificarVenta = async(req, res) => {

    let remitoVenta = req.params.remitoVenta;

    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['remitoVenta', 'fecha', 'cliente', 'idArticulo', 'descripcion','color','cantidad','precioKg','subtotalArt','total']);
  
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await Venta.updateOne({remitoVenta}, body, { new: true, runValidators: true, context: 'query' }, (err, ventaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Venta modificado',
            ok: true,
            venta: ventaDB
        });
    

    });

}


/*OBTENER VENTAS*/

const obtenerVentas = async (req, res = express.response)=>{
    const ventas = await Venta.find()
    .exec((err, ventas) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        ventas
    })


 })
}


module.exports={
    crearVenta,
    borrarVenta,
    modificarVenta,
    obtenerVentas
}