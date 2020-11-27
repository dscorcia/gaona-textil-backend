
const express = require ('express');
const {validationResult} = require ('express-validator');
const Factura  = require('../models/Factura')
const {_} = require('underscore');




/*CREACION DE FACTURA */
const crearFactura = async (req,res = express.response)=>{

    const {nroFactura} = req.body
  
try {
    let factura = await Factura.findOne({nroFactura})
    if(factura){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe esa factura'
        })
    }
   

     factura =  new Factura(req.body);

     await factura.save();

     res.status(201).json({
        ok:true,
        msg:factura.nroFactura,
        articulo: factura.articulo,
        fecha: factura.fecha,
        kgs: factura.kgs,
        proveedor: factura.proveedor,
        estado: factura.estado
                
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó la factura'
    });
    }

}



/*BORRAR FACTURA */
const borrarFactura = async(req, res) => {

  
    let nroFactura = req.params.nroFactura;
     

    await Factura.deleteOne({nroFactura}, (err, facturaDeleted) => {
           
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!facturaDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Factura no existe"
                }
            })

        }

        res.json({
            status: 'Factura borrada',
            ok: true,
            nroFactura: nroFactura
            
        });


    });

}

/*MODIFICAR FACTURA */

const modificarFactura = async(req, res) => {

    let nroFactura= req.params.nroFactura;

    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['nroFactura', 'articulo', 'fecha', 'kgs', 'precio', 'proveedor', 'estado']);
  
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await Factura.updateOne({nroFactura}, body, { new: true, runValidators: true, context: 'query' }, (err, facturaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Factura modificada',
            ok: true,
            factura: facturaDB
        });

    });

}


/*OBTENER FACTURA */

const obtenerFacturas = async (req, res = express.response)=>{
    const facturas = await Cliente.find({})
    .exec((err, facturas) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        facturas
    })


 })
}


  
module.exports={
    crearFactura,
    borrarFactura,
    modificarFactura,
    obtenerFacturas
}