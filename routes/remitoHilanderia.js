/*   RUTAS DE USUARIOS /CLIENTE
    HOST + /api/remitoHilanderia  */


    const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const {crearRemitoHilanderia, borrarRemitoHilanderia,modificarRemitoHilanderia,obtenerRemitoHilanderia} = require('../controllers/remitoHilanderia');
    const router = Router();


    /*CREAR REMITO HILANDERIA */
router.post(
    '/new',
    [
        check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
        check('ordenNro','El número de orden es obligatorio.').not().isEmpty(),
        check('articulo','El articulo es obligatorio').not().isEmpty(),
        check('descripcion','La descripción es obligatoria').not().isEmpty(),
        check('cantidad','La cantidad es obligatorio').not().isEmpty(),
        check('color','El color es  obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearRemitoHilanderia);


    /*BORRAR  CLIENTE */
router.delete('/delete/:remitoHilanderia',[
   
    check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
    validarCampos

],
borrarRemitoHilanderia);



    /* MODIFICACION DE USUARIO*/
router.put('/modify/:remitoHilanderia',[

    check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
    check('ordenNro','El número de orden es obligatorio.').not().isEmpty(),
    check('articulo','El articulo es obligatorio').not().isEmpty(),
    check('descripcion','La descripción es obligatoria').not().isEmpty(),
    check('cantidad','La cantidad es obligatorio').not().isEmpty(),
    check('color','El color es  obligatorio').not().isEmpty(),
    validarCampos
    ],
    modificarRemitoHilanderia);


    /*OBTENER REMITO HILANDERIA */
router.get('/remitoHilanderia', obtenerRemitoHilanderia);

module.exports = router;