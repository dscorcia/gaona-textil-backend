const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const { crearStock } = require('../controllers/stock');
    const router = Router();



/*CREAR STOCK */
 router.post(
     '/new',
     [
         check('idArticulo', 'El articulo es obligatorio').not().isEmpty(),
         check('descripcion','La descripcion es obligatoria').not().isEmpty(),
         check('color','El color es obligatorio').not().isEmpty(),
         check('cantidadKgs','La cantidad es obligatorio').not().isEmpty(),
         check('cantidadPiezas','El precio por kilo es obligatorio').not().isEmpty(),
         check('costo','El costo es obligatorio').not().isEmpty(),
         check('subtotalCosto','El subtotal del costo es obligatorio').not().isEmpty(),
         check('fabrica_tintoreria','La fabrica es obligatoria').not().isEmpty(),
         check('empresa','La empresa es obligatoria').not().isEmpty(),
         check('ubicacion','La ubicación es obligatoria').not().isEmpty(),
         validarCampos
     ],
     crearStock);


    module.exports=router;