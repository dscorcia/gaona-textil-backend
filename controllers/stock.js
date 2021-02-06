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


    stock =  new Stock({idArticulo: req.body.idArticulo,
                        descripcion: req.body.descripcion.toUpperCase(),
                        color: req.body.color.toUpperCase(),
                        cantidadKgsTintoreria: req.body.cantidadKgsTintoreria,
                        cantidadKgsNegocio: req.body.cantidadKgsNegocio,
                        cantidadPiezasTintoreria: req.body.cantidadPiezasTintoreria,
                        cantidadPiezasNegocio: req.body.cantidadPiezasNegocio,
                        cantidadPiezas: req.body.cantidadPiezas,
                        costo: req.body.costo,
                        subtotalCosto: req.body.subtotalCosto,
                        subtotalCostoTintoreria: req.body.subtotalCostoTintoreria,
                        fabrica_tintoreria: req.body.fabrica_tintoreria.toUpperCase(),
                        empresa: req.body.empresa.toUpperCase(),
                    });


     await stock.save();

     res.status(201).json({
        ok:true,
        msg:'Stock creado',
        idArticulo: stock.idArticulo,
        descripcion: stock.descripcion,
        color: stock.color,
        cantidadKgsTintoreria: stock.cantidadKgsTintoreria,
        cantidadKgsNegocio: stock.cantidadKgsNegocio,
        cantidadPiezasTintoreria: stock.cantidadPiezasTintoreria,
        cantidadPiezas: stock.cantidadPiezas,
        costo: stock.costo,
        subtotalCosto: stock.subtotalCosto,
        subtotalCostoTintoreria: stock.subtotalCostoTintoreria,
        fabrica_tintoreria: stock.fabrica_tintoreria,
        empresa: stock.empresa,                 
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el stock'
    });
    }

}

/*MODIFICAR STOCK */

const modificarStock = async(req, res) => {

    let idArticulo = req.params.idArticulo;
    let color = req.params.color;


    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['idArticulo', 'descripcion', 'color', 'cantidadKgsTintoreria','cantidadPiezasTintoreria','cantidadKgsNegocio','cantidadPiezasNegocio','costo','subtotalCosto','subtotalCostoTintoreria','fabrica_tintoreria','empresa','ubicacion']);
    console.log(body);
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await Stock.updateOne({idArticulo,color}, {idArticulo: req.body.idArticulo,
                                                        descripcion: req.body.descripcion.toUpperCase(),
                                                        color: req.body.color.toUpperCase(),
                                                        cantidadKgsTintoreria: req.body.cantidadKgsTintoreria,
                                                        cantidadKgsNegocio: req.body.cantidadKgsNegocio,
                                                        cantidadPiezasTintoreria: req.body.cantidadPiezasTintoreria,
                                                        cantidadPiezasNegocio: req.body.cantidadPiezasNegocio,
                                                        cantidadPiezas: req.body.cantidadPiezas,
                                                        costo: req.body.costo,
                                                        subtotalCosto: req.body.subtotalCosto,
                                                        subtotalCostoTintoreria: req.body.subtotalCostoTintoreria,
                                                        fabrica_tintoreria: req.body.fabrica_tintoreria.toUpperCase(),
                                                        empresa: req.body.empresa.toUpperCase(),},
                         { new: true, runValidators: true, context: 'query' }, (err, stockDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Stock modificado',
            ok: true,
            stockDB: stockDB
        });
    

    });

}

/*BORRAR STOCK */
const eliminarStock = async(req, res) => {

  
    let idArticulo = req.params.idArticulo;
    let color = req.params.color;

        

    await Stock.deleteOne({idArticulo,color}, (err, stockDeleted) => {
           

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!stockDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Stock no existe"
                }
            })

        }

        res.json({
            status: 'Stock borrado',
            ok: true,
            stockDeleted: stockDeleted
        });


    });

}

/*OBTENER STOCK */

const obtenerStock = async(req,res=express.response) =>{
    const stock = await Stock.find({})
    .exec((err,stock)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
    
        res.json({
            ok:true,
            stock
        })
    })
}

/*OBTENER UN UNICO STOCK*/

const obtenerStockUnico = async (req, res = express.response)=>{

    let idArticulo = req.params.idArticulo;
    let color = req.params.color

    const stockUnico = await Stock.findOne({$and:[
        {idArticulo},
        {color}
    ]})
    .exec((err, stockUnico) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        stockUnico
    })


 })
}


module.exports={
    crearStock,
    modificarStock,
    eliminarStock,
    obtenerStock,
    obtenerStockUnico
}