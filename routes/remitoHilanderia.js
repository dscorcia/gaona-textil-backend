/*   RUTAS DE REMITO HILANDERIA
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
        check('Articulos.idArticulo','El articulo es obligatorio').not().isEmpty(),
        check('Articulos.descripcion','La descripción es obligatoria').not().isEmpty(),
        check('Articulos.cantidadKgs','La cantidad es obligatorio').not().isEmpty(),
        check('Articulos.cantidadPiezas','La cantidad es obligatorio').not().isEmpty(),
        check('Articulos.color','El color es  obligatorio').not().isEmpty(),
        check('fecha','La fecha es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearRemitoHilanderia);


    /*BORRAR  REMITO HILANDERIA */
router.delete('/delete/:remitoHilanderia',[
   
    check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
    validarCampos

],
borrarRemitoHilanderia);



    /* MODIFICACION DE REMITO HILANDERIA*/
router.put('/modify/:remitoHilanderia',[

    check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
    check('Articulos.idArticulo','El articulo es obligatorio').not().isEmpty(),
    check('Articulos.descripcion','La descripción es obligatoria').not().isEmpty(),
    check('Articulos.cantidadKgs','La cantidad es obligatorio').not().isEmpty(),
    check('Articulos.cantidadPiezas','La cantidad es obligatorio').not().isEmpty(),
    check('Articulos.color','El color es  obligatorio').not().isEmpty(),
    check('fecha','La fecha es obligatoria').not().isEmpty(),
    validarCampos
    ],
    modificarRemitoHilanderia);


    /*OBTENER REMITO HILANDERIA */
router.get('/remitos', obtenerRemitoHilanderia);

module.exports = router;