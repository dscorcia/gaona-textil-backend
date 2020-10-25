/*   RUTAS DE VENTAS
    HOST + /api/venta  */

 const {Router} = require('express');
 const {check} = require('express-validator');
 const {validarCampos} = require('../middlewares/validar-campos');
 const router = Router();
 const { crearVenta,borrarVenta, modificarVenta} = require('../controllers/venta')


 /*CREAR VENTA */
router.post(
    '/new',
    [
        check('remitoVenta', 'El remito de venta es obligatorio').not().isEmpty(),
        check('fecha','La fecha es obligatoria').not().isEmpty(),
        check('cliente','El cliente es obligatorio').not().isEmpty(),
        check('idArticulo','El artículo es obligatorio').not().isEmpty(),
        check('descripcion','La descripción es obligatorio').not().isEmpty(),
        check('color','El color es obligatorio').not().isEmpty(),
        check('cantidad','La cantidad es obligatorio').not().isEmpty(),
        check('precioKg','El precio por kilo es obligatorio').not().isEmpty(),
        check('subtotalArt','El subtotal es obligatorio').not().isEmpty(),
        check('total','El total es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearVenta);


    /*BORRAR  CLIENTE */
router.delete('/delete/:remitoVenta',[
   
    check('remitoVenta', 'El remito de venta es obligatorio').not().isEmpty(),
    validarCampos

],
borrarVenta);



/* MODIFICAR VENTA */
 router.put('/modify/:remitoVenta',[
   
     check('remitoVenta', 'El remito de venta es obligatorio').not().isEmpty(),
     validarCampos
     ],
    modificarVenta);

// /*OBTENER CLIENTES */

// router.get('/ventas', obtenerVentas);


module.exports = router;