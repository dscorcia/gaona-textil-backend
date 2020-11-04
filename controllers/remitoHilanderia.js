
const express = require ('express');
const {validationResult} = require ('express-validator');
const RemitoHiladneria  = require('../models/RemitoHilanderia')
const {_} = require('underscore');




/*CREACION DE REMITO HILANDERIA */
const crearRemitoHilanderia = async (req,res = express.response)=>{

    const {remitoHilanderia} = req.body
  
try {
    let remitoHilanderia = await RemitoHiladneria.findOne({remitoHilanderia})
    if(remitoHilanderia){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe el remito de hilanderia'
        })
    }
   

     remitoHilanderia =  new RemitoHiladneria(req.body);

     await remitoHilanderia.save();

     res.status(201).json({
        ok:true,
        msg:remitoHilanderia.remitoHilanderia,
        ordenNro: remitoHilanderia.ordenNro,
        articulo: remitoHilanderia.articulo,
        descripcion: remitoHilanderia.descripcion,
        cantidad: remitoHilanderia.cantidad,
        color: remitoHilanderia.color
                
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
    let body = _.pick(req.body, ['remitoHilanderia', 'ordenNro', 'articulo', 'descripcion', 'cantidad', 'color']);
  
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
    const remitosHilanderia = await Cliente.find({})
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