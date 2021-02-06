
const express = require ('express');
const {validationResult} = require ('express-validator');
const RemitoHilanderia  = require('../models/RemitoHilanderia')
const SolicitudRemitoTintoreria  = require('../models/SolicitudRemitoTintoreria')
const {_} = require('underscore');





/*CREACION DE SOLICITUD TINTORERIA */
const crearSolicitudTintoreria = async (req,res = express.response)=>{

    let {nroSolicitudTintoreria, remitoHilanderia} = req.body
    const remitoH = await RemitoHilanderia.find({remitoHilanderia})

  
    // const clienteVenta = await Cliente.find({nombre:cliente})
  
try {
    solicitud = await SolicitudRemitoTintoreria.findOne({nroSolicitudTintoreria})
    if(solicitud){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe ese nro de solicitud a Tintoreria'
        })
    }
   

    solicitud =  new SolicitudRemitoTintoreria(req.body);

     await solicitud.save();

     res.status(201).json({
        ok:true,
        msg:solicitud.nroSolicitudTintoreria,
        remitoHilanderia: remitoHilanderia[0].remitoHilanderia,
        articulo: solicitud.articulos.idArticulo,
        descripcion: solicitud.articulos.descripcion,
        cantidadKgs: solicitud.articulos.cantidadKgs,
        cantidadKgsRib: solicitud.articulos.cantidadKgsRib,
        cantidadPiezas: solicitud.articulos.cantidadPiezas,
        cantidadPiezasRib: solicitud.articulos.cantidadPiezasRib,
        color: solicitud.articulos.color,
        fecha: solicitud.fecha,                
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el remito de hilanderia'
    });
    }

}



/*BORRAR SOLICITUD TINTORERIA */
const borrarSolicitudTintoreria = async(req, res) => {

   
    let nroSolicitudTintoreria = req.params.solicitudTintoreria;
   console.log(nroSolicitudTintoreria);

    await SolicitudRemitoTintoreria.deleteOne({nroSolicitudTintoreria}, (err, solicitudTintoreriaDeleted) => {
           
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!solicitudTintoreriaDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Solicitud de Tintoreria no existe"
                }
            })

        }

        res.json({
            status: 'Solicitud de Tintoreria borrado',
            ok: true,
            nroSolicitudTintoreria: nroSolicitudTintoreria
            
        });


    });

}

/*MODIFICAR REMITO DE TINTORERIA */

const modificarSolicitudTintoreria = async(req, res) => {

    let nroSolicitudTintoreria = req.params.solicitudTintoreria;
   


    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['nroSolicitudTintoreria', 'remitoHilanderia', 'articulos', 'fecha']);
  


    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await SolicitudRemitoTintoreria.updateOne({nroSolicitudTintoreria}, body, { new: true, runValidators: true, context: 'query' }, (err, solicitudTintoreriaDB) => {
 
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Solicitud de Tintoreria modificado',
            ok: true,
            nroSolicitudTintoreria: solicitudTintoreriaDB
        });

    });

}


/*OBTENER SOLICITUD DE TINTORERIA */

const obtenerSolicitudTintoreria = async (req, res = express.response)=>{
    const nroSolicitudTintoreria = await SolicitudRemitoTintoreria.find({})
    .exec((err, nroSolicitudTintoreria) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        nroSolicitudTintoreria
    })


 })
}



/*OBTENER UN UNICA SOLICITUD*/

const obtenerSolicitudUnicaTintoreria = async (req, res = express.response)=>{

    let nroSolicitudTintoreria = req.params.solicitudTintoreria;

    const solicitudTintoreria = await SolicitudRemitoTintoreria.findOne({nroSolicitudTintoreria})
    .exec((err, solicitudTintoreria) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        solicitudTintoreria
    })


 })
}

  
module.exports={
    crearSolicitudTintoreria,
    borrarSolicitudTintoreria,
    modificarSolicitudTintoreria,
    obtenerSolicitudTintoreria,
    obtenerSolicitudUnicaTintoreria
}