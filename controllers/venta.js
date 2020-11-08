
const express = require ('express');
const {validationResult} = require ('express-validator');
const Cliente   = require('../models/Cliente');
const Venta = require('../models/Venta');
const {_} = require('underscore');




/*CREACION DE VENTA */
const crearVenta = async (req,res = express.response)=>{

    let {remitoVenta, cliente} = req.body
  
    const clienteVenta = await Cliente.find({nombre:cliente})
  
try {
    
    let venta = await Venta.findOne({remitoVenta})
    if(venta){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe una venta con ese número de remito de venta'
        })
    }
   
    console.log('LOG ANTES DEL SAVE de la venta body ' + Venta(req.body))
     venta =  new Venta(req.body);
     console.log('LOG DPS DEL SAVE de la venta ' + venta);
        let longitudArticulos = req.body.Articulos.length;
        // for(let i=0; i<longitudArticulos; i++){
        //     venta = new Venta(
        //         req.body.remitoVenta,
        //         req.body.fecha,
        //         req.body.cliente,
        //         req.body.Articulos[i].idArticulo,
        //         req.body.Articulos[i].descripcion,
        //         req.body.Articulos[i].color,
        //         req.body.Articulos[i].cantidad,
        //         req.body.Articulos[i].precioKg,
        //         req.body.Articulos[i].subtotalArt

        //     )
        // }
        
        console.log(venta);

     await venta.save();

     res.status(201).json({
        ok:true,
        msg:"Venta cargada",
        remitoVenta: venta.remitoVenta,
        fecha: venta.fecha,
        cliente: clienteVenta[0].nombre,
        idArticulo: venta.Articulos.idArticulo,
        descripcion: venta.Articulos.descripcion,
        color: venta.Articulos.color,
        cantidad: venta.Articulos.cantidad,
        precioKg: venta.Articulos.precioKg,
        subtotalArt: venta.Articulos.subtotalArt,
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
            remitoVenta: remitoVenta
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