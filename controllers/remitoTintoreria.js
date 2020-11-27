
const express = require ('express');
const {validationResult} = require ('express-validator');
const RemitoHilanderia  = require('../models/RemitoHilanderia')
const RemitoTintoreria  = require('../models/RemitoTintoreria')
const {_} = require('underscore');





/*CREACION DE REMITO TINTORERIA */
const crearRemitoTintoreria = async (req,res = express.response)=>{

    let {nroRemitoTintoreria, remitoHilanderia} = req.body
    console.log(nroRemitoTintoreria);
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

     res.status(201).json({
        ok:true,
        msg:remito.nroRemitoTintoreria,
        nroPartiada: remito.nroPartiada,
        remitoHilanderia: remitoHilanderia[0].remitoHilanderia,
        articulo: remito.Articulos.idArticulo,
        descripcion: remito.Articulos.descripcion,
        cantidadKgs: remito.Articulos.cantidadKgs,
        cantidadKgsRib: remito.Articulos.cantidadKgsRib,
        cantidadPiezas: remito.Articulos.cantidadPiezas,
        cantidadPiezasRib: remito.Articulos.cantidadPiezasRib,
        color: remito.Articulos.color,
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



/*BORRAR REMITO TINTORERIA */
const borrarRemitoTintoreria = async(req, res) => {

  
    let remitoTintoreria = req.params.remitoTintoreria;
     

    await RemitoTintoreria.deleteOne({remitoTintoreria}, (err, remitoTintoreriaDeleted) => {
           
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
            remitoTintoreria: remitoTintoreria
            
        });


    });

}

/*MODIFICAR REMITO DE TINTORERIA */

const modificarRemitoTintoreria = async(req, res) => {

    let remitoTintoreria = req.params.remitoTintoreria;
    console.log(typeof(remitoTintoreria));


    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['nroRemitoTintoreria', 'nroPartida', 'remitoHilanderia', 'Articulos', 'fecha']);
  
    console.log(body);

    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await RemitoTintoreria.updateOne({remitoTintoreria}, body, { new: true, runValidators: true, context: 'query' }, (err, remitoTintoreriaDB) => {
      console.log(typeof(remitoTintoreria));
      console.log({remitoTintoreria});
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Remito de Tintoreria modificado',
            ok: true,
            remitoTintoreria: remitoTintoreriaDB
        });

    });

}


/*OBTENER REMITO DE TINTORERIA */

const obtenerRemitoTintoreria = async (req, res = express.response)=>{
    const remitosTintoreria = await RemitoTintoreria.find({})
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



/*OBTENER UN UNICO REMITO*/

const obtenerRemitoUnicoTintoreria = async (req, res = express.response)=>{

    let remitoTintoreria = req.params.remitoTintoreria;

    const remitosTintoreria = await RemitoTintoreria.findOne({remitoTintoreria})
    .exec((err, remitoTintoreria) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        remitoTintoreria
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