/*   RUTAS DE USUARIOS /CLIENTE
    HOST + /api/remitoHilanderia  */


    const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const {} = require('../controllers/remitoHilanderia');
    const router = Router();


    /*CREAR REMITO HILANDERIA */
router.post(
    '/new',
    [
        check('remitoID','El número de remito es obligatorio.').not().isEmpty(),
        check('ordenNro','El número de orden es obligatorio.').not().isEmpty(),
        check('articulo','El articulo es obligatorio').not().isEmpty(),
        check('kgs','Los kilos son obligatorio').not().isEmpty(),
        check('cantPiezas','La cantidad de piezas es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearRemitoHilanderia);


    /*BORRAR  CLIENTE */
router.delete('/delete/:remitoID',[
   
    check('remitoId','El número de remito es obligatorio.').not().isEmpty(),
    validarCampos

],
borrarRemitoHilanderia);



/* MODIFICACION DE USUARIO*/
router.put('/modify/:remitoID',[

        check('remitoID','El número de remito es obligatorio.').not().isEmpty(),
        check('ordenNro','El número de orden es obligatorio.').not().isEmpty(),
        check('articulo','El articulo es obligatorio').not().isEmpty(),
        check('kgs','Los kilos son obligatorio').not().isEmpty(),
        check('cantPiezas','La cantidad de piezas es obligatorio').not().isEmpty(),
        validarCampos

    ],
    modificarRemitoHilanderia);


module.exports = router;