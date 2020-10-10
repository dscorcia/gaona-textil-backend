const express = require ('express');
const {validationResult} = require ('express-validator');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt')


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

    const token = await generarJWT(usuario.id, usuario,name)

         
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




const loginUsuario =  async (req,res = express.response)=>{

    const {name,empresa,password} = req.body

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

        const token = await generarJWT(usuario.id, usuario,name)

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
    const name = req.name.name;

    console.log(name);

    const token = await generarJWT(uid, name)

    res.json({
        ok:true,
     
        token
    })
    
}

module.exports ={
    crearUsuario,
    loginUsuario,
    renewToken: revalidarToken
}