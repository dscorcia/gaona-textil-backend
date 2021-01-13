const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const { crearStock, modificarStock, eliminarStock, obtenerStock } = require('../controllers/stock');
    const router = Router();



/*CREAR STOCK */
 router.post(
     '/new',
     [
         check('idArticulo', 'El articulo es obligatorio').not().isEmpty(),
         check('descripcion','La descripcion es obligatoria').not().isEmpty(),
         check('color','El color es obligatorio').not().isEmpty(),
         check('cantidadKgsTintoreria','La cantidad es obligatorio').not().isEmpty(),
         check('cantidadKgsNegocio','La cantidad es obligatorio').not().isEmpty(),
         check('cantidadPiezasTintoreria','El precio por kilo es obligatorio').not().isEmpty(),
         check('cantidadPiezasNegocio','El precio por kilo es obligatorio').not().isEmpty(),
         check('costo','El costo es obligatorio').not().isEmpty(),
         check('subtotalCosto','El subtotal del costo es obligatorio').not().isEmpty(),
         check('fabrica_tintoreria','La fabrica es obligatoria').not().isEmpty(),
         check('empresa','La empresa es obligatoria').not().isEmpty(),
         validarCampos
     ],
     crearStock);


/*MODIFICAR STOCK */
router.put(
    '/modify/:idArticulo/:color',
    [
        check('idArticulo', 'El articulo es obligatorio').not().isEmpty(),
         check('descripcion','La descripcion es obligatoria').not().isEmpty(),
         check('color','El color es obligatorio').not().isEmpty(),
         check('cantidadKgsTintoreria','La cantidad es obligatorio').not().isEmpty(),
         check('cantidadKgsNegocio','La cantidad es obligatorio').not().isEmpty(),
         check('cantidadPiezasTintoreria','El precio por kilo es obligatorio').not().isEmpty(),
         check('cantidadPiezasNegocio','El precio por kilo es obligatorio').not().isEmpty(),
         check('costo','El costo es obligatorio').not().isEmpty(),
         check('subtotalCosto','El subtotal del costo es obligatorio').not().isEmpty(),
         check('fabrica_tintoreria','La fabrica es obligatoria').not().isEmpty(),
         check('empresa','La empresa es obligatoria').not().isEmpty(),
        validarCampos
    ],
    modificarStock);

    /*BORRAR STOCK */

    router.delete('/delete/:idArticulo/:color',
    [
        check('idArticulo', 'El articulo es obligatorio').not().isEmpty(),
        check('color','El color es obligatorio').not().isEmpty(),
        check('ubicacion','La ubicación es obligatoria').not().isEmpty(),
        validarCampos
    ],
    eliminarStock);

    /*OBTENER STOCK */
    router.get('/stock', obtenerStock)



    module.exports=router;