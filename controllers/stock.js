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

/*MODIFICAR STOCK */

const modificarStock = async(req, res) => {

    let idArticulo = req.params.idArticulo;
    let color = req.params.color;
    let ubicacion = req.params.ubicacion
    console.log("Antes del pick" + req.body);

    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['idArticulo', 'descripcion', 'color', 'cantidadKgs','cantidadPiezas','costo','subtotalCosto','fabrica_tintoreria','empresa','ubicacion']);
    console.log("Despues del pick" + req.body);
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await Stock.updateOne({idArticulo,color,ubicacion}, body, { new: true, runValidators: true, context: 'query' }, (err, stockDB) => {
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
    console.log(idArticulo);
    console.log(color);
    console.log(ubicacion);
        

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