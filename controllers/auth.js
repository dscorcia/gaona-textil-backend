const express = require ('express');
const {validationResult} = require ('express-validator');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');
const {_} = require('underscore');

/*CREACION DE USUARIO */
const crearUsuario = async (req,res = express.response)=>{

    const {name,password} = req.body
try {
    
    let usuario = await Usuario.findOne({name})
    if(usuario){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe ese nombre de usuario'
        })
    }

     usuario =  new Usuario(req.body);

     //Encriptar contraseña
     const salt = bcrypt.genSaltSync();
     usuario.password = bcrypt.hashSync(password,salt);

    await usuario.save();

    //Generar JWT

    const token = await generarJWT(usuario.id, usuario.name)

         
    res.status(201).json({
        ok:true,
        msg:usuario.id,
        name: usuario.name,
        token
        
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el usuario'
    });
    }

}


/*LOGUIN DE USUARIO */

const loginUsuario =  async (req,res = express.response)=>{

    const {name,password} = req.body

    try {
               let usuario = await Usuario.findOne({name})
        if(!usuario){
        return res.status(400).json({
            ok: false,
            msg:'El usuario no existe'
        })
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg:"Password incorrecto"
            });
        }

        //Generar nuestro JWT

        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok:"true",
            uid: usuario.id,
            name: usuario.name,
            token

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador, no se creó el usuario'
        });
        }

}


const revalidarToken = async (req,res = express.response)=>{

    const uid = req.uid;
    const name = req.name;

    

    const token = await generarJWT(uid, name)

    res.json({
        ok:true,
        uid,
        name,
        token
    })
    
}

const borrarUsuario = async(req, res) => {

  
    let name = req.params.name;
    

    await Usuario.deleteOne({name}, (err, userDeleted) => {
        console.log(err)
        console.log(userDeleted);
        console.log(name);
        

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no existe"
                }
            })

        }

        res.json({
            status: 'Usuario borrado',
            ok: true,
            usuario: userDeleted
        });


    });

}


/* MODIFICAR USUARIO */
const modificarUsuario = async(req, res) => {

    let name = req.params.name;
   


    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['name', 'nombre', 'apellido', 'dni', 'password','perfil']);
    console.log(body)
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos

    
    await Usuario.updateOne({name}, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
       
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

      

        
        
        res.json({
            status: 'Usuario modificado',
            ok: true,
            usuario: usuarioDB
        });
    

    });

}

module.exports ={
    crearUsuario,
    loginUsuario,
    renewToken: revalidarToken,
    borrarUsuario,
    modificarUsuario
}