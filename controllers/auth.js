const express = require ('express');



const crearUsuario = (req,res = express.response)=>{

    const {name,password,empresa} = req.body
    res.json({
        ok:true,
        msg:'Registro',
        name,
        password,
        empresa
    })

}




const loginUsuario = (req,res = express.response)=>{

    const {name,password,empresa} = req.body
    res.json({
        ok:true,
        msg:'Login',
        name,
        password,
        empresa
    })

}


const revalidarToken = (req,res = express.response)=>{

    res.json({
        ok:true,
        msg:'Renew'
    })

}

module.exports ={
    crearUsuario,
    loginUsuario,
    renewToken: revalidarToken
}