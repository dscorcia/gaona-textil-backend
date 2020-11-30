const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const {} = require('../controllers/stock');
    const router = Router();



/*CREAR STOCK */
// router.post(
//     '/new',
//     [
//         check('idArticulo', 'El articulo es obligatorio').not().isEmpty(),
//         check('descripcion','La descripcion es obligatoria').not().isEmpty(),
//         check('color','El color es obligatorio').not().isEmpty(),
//         check('cantidadKgs','La cantidad es obligatorio').not().isEmpty(),
//         check('cantidadPiezas','El precio por kilo es obligatorio').not().isEmpty(),
//         validarCampos
//     ],
//     crearStock);


    module.exports=router;