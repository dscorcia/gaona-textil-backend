/*   RUTAS DE REMITO TINTORERIA
    HOST + /api/remitoTintoteria  */


    const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const {crearRemitoTintoreria,borrarRemitoTintoreria,modificarRemitoTintoreria,obtenerRemitoTintoreria} = require('../controllers/remitoTintoreria');
    const router = Router();


    /*CREAR REMITO TINTORERIA */
router.post(
    '/new',
    [
        check('nroRemitoTintoreria','El número de remito es obligatorio.').not().isEmpty(),
        check('nroPartida','El número de partida es obligatorio.').not().isEmpty(),
        check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
        check('Articulos.idArticulo','El articulo es obligatorio').not().isEmpty(),
        check('Articulos.descripcion','La descripción es obligatoria').not().isEmpty(),
        check('Articulos.cantidadKgs','La cantidad de kgs es obligatorio').not().isEmpty(),
        // check('Articulos.cantidadKgsRib','La cantidad de kgs de rib es obligatorio').not().isEmpty(),
        check('Articulos.cantidadPiezas','La cantidad de piezas es obligatorio').not().isEmpty(),
        // check('Articulos.cantidadPiezasRib','La cantidad de piezas de rib es obligatorio').not().isEmpty(),
        check('Articulos.color','El color es  obligatorio').not().isEmpty(),
        check('fecha','La fecha es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearRemitoTintoreria);


    /*BORRAR  REMITO TINTORERIA */
router.delete('/delete/:remitoHilanderia',[
   
    check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
    validarCampos

],
borrarRemitoTintoreria);



    /* MODIFICACION DE REMITO TINTORERIA*/
router.put('/modify/:remitoHilanderia',[

        check('nroRemitoTintoreria','El número de remito es obligatorio.').not().isEmpty(),
        check('nroPartida','El número de partida es obligatorio.').not().isEmpty(),
        check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
        check('Articulos.idArticulo','El articulo es obligatorio').not().isEmpty(),
        check('Articulos.descripcion','La descripción es obligatoria').not().isEmpty(),
        check('Articulos.cantidadKgs','La cantidad de kgs es obligatorio').not().isEmpty(),
        // check('Articulos.cantidadKgsRib','La cantidad de kgs de rib es obligatorio').not().isEmpty(),
        check('Articulos.cantidadPiezas','La cantidad de piezas es obligatorio').not().isEmpty(),
        // check('Articulos.cantidadPiezasRib','La cantidad de piezas de rib es obligatorio').not().isEmpty(),
        check('Articulos.color','El color es  obligatorio').not().isEmpty(),
        check('fecha','La fecha es obligatoria').not().isEmpty(),
        validarCampos
    ],
    modificarRemitoTintoreria);


    /*OBTENER REMITO HILANDERIA */
router.get('/remitos', obtenerRemitoTintoreria);

module.exports = router;