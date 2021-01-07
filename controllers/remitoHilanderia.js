
const express = require ('express');
const {validationResult} = require ('express-validator');
const RemitoHilanderia  = require('../models/RemitoHilanderia')
const {_} = require('underscore');




/*CREACION DE REMITO HILANDERIA */
const crearRemitoHilanderia = async (req,res = express.response)=>{

    let {remitoHilanderia} = req.body
  
  
try {
    remito = await RemitoHilanderia.findOne({remitoHilanderia:remitoHilanderia})
  
    if(remito){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe el remito de hilanderia'
        })
    }
   

    remito =  new RemitoHilanderia(req.body);

     await remito.save();

     res.status(201).json({
        ok:true,
        msg:remito.remitoHilanderia,
        /*articulo: remito.articulos.idArticulo,
        descripcion: remito.articulos.descripcion,
        cantidadKgs: remito.articulos.cantidadKgs,
        cantidadPiezas: remito.articulos.cantidadPiezas,
        color: remito.articulos.color,*/
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
    console.log(remitoHilanderia);
     

    await RemitoHilanderia.deleteOne({remitoHilanderia}, (err, remitoHilanderiaDeleted) => {
           
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
    let body = _.pick(req.body, ['remitoHilanderia', 'articulos', 'fecha','nroFactura']);
  
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await RemitoHilanderia.updateOne({remitoHilanderia}, body, { new: true, runValidators: true, context: 'query' }, (err, remitoHilanderiaDB) => {
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


/*OBTENER REMITOS DE HILANDERIA */

const obtenerRemitoHilanderia = async (req, res = express.response)=>{
    const remitosHilanderia = await RemitoHilanderia.find({})
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


/*OBTENER UN UNICO REMITO*/

const obtenerRemitoUnico = async (req, res = express.response)=>{

    let remitoHilanderia = req.params.remitoHilanderia;

    const remitosHilanderia = await RemitoHilanderia.findOne({remitoHilanderia})
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
    obtenerRemitoHilanderia,
    obtenerRemitoUnico
}