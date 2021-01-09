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
                        cantidadKgs: req.body.cantidadKgs,
                        cantidadPiezas: req.body.cantidadPiezas,
                        costo: req.body.costo,
                        subtotalCosto: req.body.subtotalCosto,
                        fabrica_tintoreria: req.body.fabrica_tintoreria.toUpperCase(),
                        empresa: req.body.empresa.toUpperCase(),
                        ubicacion: req.body.ubicacion.toUpperCase()
                    });


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

/*MODIFICAR STOCK */

const modificarStock = async(req, res) => {

    let idArticulo = req.params.idArticulo;
    let color = req.params.color;
    let ubicacion = req.params.ubicacion


    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['idArticulo', 'descripcion', 'color', 'cantidadKgs','cantidadPiezas','costo','subtotalCosto','fabrica_tintoreria','empresa','ubicacion']);
    console.log(body);
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await Stock.updateOne({idArticulo,color,ubicacion}, {idArticulo:body.idArticulo,
                                                        descripcion:body.descripcion.toUpperCase(),
                                                        color:body.color.toUpperCase(),
                                                        cantidadPiezas:body.cantidadPiezas,
                                                        costo: body.costo,
                                                        subtotalCosto: body.subtotalCosto,
                                                        fabrica_tintoreria: body.fabrica_tintoreria.toUpperCase(),
                                                        empresa:body.empresa.toUpperCase(),
                                                        ubicacion:body.ubicacion.toUpperCase()},
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
    let ubicacion = req.params.ubicacion

        

    await Stock.deleteOne({idArticulo,color,ubicacion}, (err, stockDeleted) => {
           

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



module.exports={
    crearStock,
    modificarStock,
    eliminarStock
}