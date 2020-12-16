const express = require ('express');
const {validationResult} = require ('express-validator');
const Cliente   = require('../models/Cliente');
const Venta = require('../models/Venta');
const {_} = require('underscore');




/*CREACION DE VENTA */
const crearVenta = async (req,res = express.response)=>{


    let {remitoVenta, cliente} = req.body
  
    const clienteVenta = await Cliente.find({nombre:cliente})
  
try {
    
    let venta = await Venta.findOne({remitoVenta})
    if(venta){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe una venta con ese número de remito de venta'
        })
    }
   
   // console.log('LOG ANTES DEL SAVE de la venta body ' + Venta(req.body))
     venta =  new Venta(req.body);

        let subtotal;
      console.log(req.body);
    const calcularTotal = ()=>{
        for (let i=0; i<req.body.articulos.length;i++)
        subtotal = subtotal + (venta.articulos[i].cantidad * venta.articulos[i].precioKg)
    }

    calcularTotal();
    console.log(subtotal);

     await venta.save();

     res.status(201).json({
        ok:true,    
        msg:"Venta cargada",
        remitoVenta: venta.remitoVenta,
        fecha: venta.fecha,
        cliente: clienteVenta[0].nombre,
        //cliente: venta.cliente,
        idArticulo: venta.articulos.idArticulo,
        descripcion: venta.articulos.descripcion,
        color: venta.articulos.color,
        cantidad: venta.articulos.cantidad,
        precioKg: venta.articulos.precioKg,
        //Revisar tema for de subtotal
        subtotalArt: subtotal,
        total:venta.total    
                       
    })
    
}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó la venta'
    });
    }

}


/*BORRAR VENTA */
const borrarVenta = async(req, res) => {

  
    let remitoVenta = req.params.remitoVenta;
        

    await Venta.deleteOne({remitoVenta}, (err, ventaDeleted) => {
           

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!ventaDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Venta no existe"
                }
            })

        }

        res.json({
            status: 'Venta borrada',
            ok: true,
            remitoVenta: remitoVenta
        });


    });

}



/*MODIFICAR VENTA */

const modificarVenta = async(req, res) => {

    let remitoVenta = req.params.remitoVenta;
    console.log(remitoVenta);
    console.log("Antes del pick" + req.body);

    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['remitoVenta', 'fecha', 'cliente', 'Articulos']);
    console.log("Despues del pick" + req.body);
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await Venta.updateOne({remitoVenta}, body, { new: true, runValidators: true, context: 'query' }, (err, ventaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Venta modificado',
            ok: true,
            venta: ventaDB
        });
    

    });

}


/*OBTENER VENTAS*/

const obtenerVentas = async (req, res = express.response)=>{
    const ventas = await Venta.find()
    .exec((err, ventas) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        ventas
    })


 })
}

/*OBTENER UNA VENTA*/

const obtenerVentaUnica = async (req, res = express.response)=>{

    let remitoVenta = req.params.remitoVenta;

    const ventas = await Venta.findOne({remitoVenta})
    .exec((err, ventas) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        ventas
    })


 })
}


module.exports={
    crearVenta,
    borrarVenta,
    modificarVenta,
    obtenerVentas,
    obtenerVentaUnica
}