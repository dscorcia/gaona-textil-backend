
const express = require ('express');
const {validationResult} = require ('express-validator');
const Cliente   = require('../models/Cliente')
const bcrypt = require('bcryptjs');
const {_} = require('underscore');




/*CREACION DE CLIENTE */
const crearCliente = async (req,res = express.response)=>{

    const {cuit} = req.body
try {
    
    let cliente = await Cliente.findOne({cuit})
    if(cliente){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe ese número de Cuit'
        })
    }

     cliente =  new Cliente(req.body);

     await cliente.save();

     res.status(201).json({
        ok:true,
        msg:cliente.id,
        cuit: cliente.cuit,
        razonSocial: cliente.razonSocial,
        telefono: cliente.telefono
                
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el cliente'
    });
    }

}



/*BORRAR CLIENTE */
const borrarCliente = async(req, res) => {

  
    let cuit = req.params.cuit;
    

    await Cliente.deleteOne({cuit}, (err, clienteDeleted) => {
           

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!clienteDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Cliente no existe"
                }
            })

        }

        res.json({
            status: 'cliente borrado',
            ok: true,
            cuit: cuit
        });


    });

}

/*MODIFICAR CLIENTE */

const modificarCliente = async(req, res) => {

    let cuit = req.params.cuit;

    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['razonSocial', 'cuit', 'telefono']);
  
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await Cliente.updateOne({cuit}, body, { new: true, runValidators: true, context: 'query' }, (err, clienteDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Cliente modificado',
            ok: true,
            cliente: clienteDB
        });
    

    });

}

module.exports={
    crearCliente,
    borrarCliente,
    modificarCliente
}