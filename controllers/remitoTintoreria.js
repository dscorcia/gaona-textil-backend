
const express = require ('express');
const {validationResult} = require ('express-validator');
const RemitoHilanderia  = require('../models/RemitoHilanderia')
const RemitoTintoreria  = require('../models/RemitoTintoreria')
const Stock = require ('../models/Stock');
const {_} = require('underscore');





/*CREACION DE REMITO TINTORERIA */
const crearRemitoTintoreria = async (req,res = express.response)=>{

    let {nroRemitoTintoreria, remitoHilanderia, articulos} = req.body
    const remitoH = await RemitoHilanderia.find({remitoHilanderia})

  
    // const clienteVenta = await Cliente.find({nombre:cliente})
  
try {
    remito = await RemitoTintoreria.findOne({nroRemitoTintoreria})
    if(remito){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe el remito de tintoreria'
        })
    }
   

    remito =  new RemitoTintoreria(req.body);

     await remito.save();

     for( let articulo of articulos){
         
        ActualizarCantidadNegocio(articulo);
    }

     res.status(201).json({
        ok:true,
        msg:remito.nroRemitoTintoreria,
        nroPartiada: remito.nroPartiada,
        remitoHilanderia: remitoHilanderia[0].remitoHilanderia,
        articulo: remito.articulos.idArticulo,
        descripcion: remito.articulos.descripcion,
        cantidadKgs: remito.articulos.cantidadKgs,
        cantidadKgsRib: remito.articulos.cantidadKgsRib,
        cantidadPiezas: remito.articulos.cantidadPiezas,
        cantidadPiezasRib: remito.articulos.cantidadPiezasRib,
        color: remito.articulos.color,
        fecha: remito.fecha,                
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el remito de hilanderia'
    });
    }

}

const ActualizarCantidadNegocio = async(req, res) => {

    console.log(req);
    const { idArticulo, descripcion, color, cantidadKgs, cantidadPiezas, cantidadKgsRib, cantidadPiezasRib } = req;

    const stockUnico = await Stock.findOne({$and:[
        {idArticulo},
        {color}
    ]})

    if(stockUnico){

        await Stock.updateOne({idArticulo,color},
            { 
                idArticulo: idArticulo,
                descripcion: descripcion.toUpperCase(),
                color: color.toUpperCase(),
                cantidadKgsTintoreria: parseFloat(stockUnico.cantidadKgsTintoreria) - parseFloat(cantidadKgs),
                cantidadKgsNegocio: stockUnico.cantidadKgsNegocio + parseFloat(cantidadKgs),
                cantidadPiezasTintoreria: parseFloat(stockUnico.cantidadPiezasTintoreria) - parseFloat(cantidadPiezas),
                cantidadPiezasNegocio: stockUnico.cantidadPiezasNegocio + parseFloat(cantidadPiezas),
                cantidadPiezas: cantidadPiezas,
                costo: stockUnico.costo,
                subtotalCosto: stockUnico.subtotalCosto,
                fabrica_tintoreria: stockUnico.fabrica_tintoreria,
                empresa: stockUnico.empresa,
            },
            { new: true, runValidators: true, context: 'query' }, (err, stockDB) => {
                if (err) {
                    console.log(err);
                }
        
            });

    }
    


}



/*BORRAR REMITO TINTORERIA */
const borrarRemitoTintoreria = async(req, res) => {

   
    let nroRemitoTintoreria = req.params.remitoTintoreria;
   

    await RemitoTintoreria.deleteOne({nroRemitoTintoreria}, (err, remitoTintoreriaDeleted) => {
           
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!remitoTintoreriaDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Remito de Tintoreria no existe"
                }
            })

        }

        res.json({
            status: 'Remito de Tintoreria borrado',
            ok: true,
            nroRemitoTintoreria: nroRemitoTintoreria
            
        });


    });

}

/*MODIFICAR REMITO DE TINTORERIA */

const modificarRemitoTintoreria = async(req, res) => {

    let nroRemitoTintoreria = req.params.remitoTintoreria;
   


    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['nroRemitoTintoreria', 'nroPartida', 'remitoHilanderia', 'Articulos', 'fecha']);
  


    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await RemitoTintoreria.updateOne({nroRemitoTintoreria}, body, { new: true, runValidators: true, context: 'query' }, (err, remitoTintoreriaDB) => {
 
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Remito de Tintoreria modificado',
            ok: true,
            nroRemitoTintoreria: remitoTintoreriaDB
        });

    });

}


/*OBTENER REMITO DE TINTORERIA */

const obtenerRemitoTintoreria = async (req, res = express.response)=>{
    const nroRemitoTintoreria = await RemitoTintoreria.find({})
    .exec((err, nroRemitoTintoreria) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        nroRemitoTintoreria
    })


 })
}



/*OBTENER UN UNICO REMITO*/

const obtenerRemitoUnicoTintoreria = async (req, res = express.response)=>{

    let nroRemitoTintoreria = req.params.remitoTintoreria;

    const remitosTintoreria = await RemitoTintoreria.findOne({nroRemitoTintoreria})
    .exec((err, remitosTintoreria) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        remitosTintoreria
    })


 })
}

  
module.exports={
    crearRemitoTintoreria,
    borrarRemitoTintoreria,
    modificarRemitoTintoreria,
    obtenerRemitoTintoreria,
    obtenerRemitoUnicoTintoreria
}