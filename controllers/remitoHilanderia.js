
const express = require ('express');
const {validationResult} = require ('express-validator');
const RemitoHiladneria  = require('../models/RemitoHilanderia')
const {_} = require('underscore');




/*CREACION DE REMITO HILANDERIA */
const crearRemitoHilanderia = async (req,res = express.response)=>{

    let {remitoHilanderia} = req.body
    console.log(remitoHilanderia);
  
try {
    remito = await RemitoHiladneria.findOne({remitoHilanderia})
    if(remito){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe el remito de hilanderia'
        })
    }
   

    remito =  new RemitoHiladneria(req.body);

     await remito.save();

     res.status(201).json({
        ok:true,
        msg:remito.remitoHilanderia,
        articulo: remito.Articulos.idArticulo,
        descripcion: remito.Articulos.descripcion,
        cantidadKgs: remito.Articulos.cantidadKgs,
        cantidadPiezas: remito.Articulos.cantidadPiezas,
        color: remito.Articulos.color,
        fecha: remito.fecha,
        nroFactura: remito.nroFactura
                
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el remito de hilanderia'
    });
    }

}



/*BORRAR REMITO HILANDERIA */
const borrarRemitoHilanderia = async(req, res) => {

  
    let remitoHilanderia = req.params.remitoHilanderia;
     

    await RemitoHiladneria.deleteOne({remitoHilanderia}, (err, remitoHilanderiaDeleted) => {
           
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!remitoHilanderiaDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Remito de Hilanderia no existe"
                }
            })

        }

        res.json({
            status: 'Remito de Hilanderia borrado',
            ok: true,
            remitoHilanderia: remitoHilanderia
            
        });


    });

}

/*MODIFICAR REMITO DE HILANDERIA */

const modificarRemitoHilanderia = async(req, res) => {

    let remitoHilanderia = req.params.remitoHilanderia;

    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['remitoHilanderia', 'idArticulo', 'descripcion', 'cantidadKgs','cantidadPiezas', 'color', 'fecha','nroFactura']);
  
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await RemitoHiladneria.updateOne({remitoHilanderia}, body, { new: true, runValidators: true, context: 'query' }, (err, remitoHilanderiaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Remito de Hilanderia modificado',
            ok: true,
            remitoHilanderia: remitoHilanderiaDB
        });

    });

}


/*OBTENER REMITO DE HILANDERIA */

const obtenerRemitoHilanderia = async (req, res = express.response)=>{
    const remitosHilanderia = await RemitoHiladneria.find({})
    .exec((err, remitosHilanderia) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        remitosHilanderia
    })


 })
}


  
module.exports={
    crearRemitoHilanderia,
    borrarRemitoHilanderia,
    modificarRemitoHilanderia,
    obtenerRemitoHilanderia
}