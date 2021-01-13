/*   RUTAS DE REMITO TINTORERIA
    HOST + /api/remitoTintoteria  */


    const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const { crearSolicitudTintoreria,borrarSolicitudTintoreria,modificarSolicitudTintoreria,obtenerSolicitudTintoreria,obtenerSolicitudUnicaTintoreria } = require('../controllers/solicitudRemitoTintoreria');
    const router = Router();


    /*CREAR SOLICITUD TINTORERIA */
router.post(
    '/new',
    [
        check('nroSolicitudTintoreria','El número de remito es obligatorio.').not().isEmpty(),
        check('nroPartida','El número de partida es obligatorio.').not().isEmpty(),
        check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
        // check('Articulos.idArticulo','El articulo es obligatorio').not().isEmpty(),
        // check('Articulos.descripcion','La descripción es obligatoria').not().isEmpty(),
        // check('Articulos.cantidadKgs','La cantidad de kgs es obligatorio').not().isEmpty(),
        // check('Articulos.cantidadKgsRib','La cantidad de kgs de rib es obligatorio').not().isEmpty(),
        // check('Articulos.cantidadPiezas','La cantidad de piezas es obligatorio').not().isEmpty(),
        // check('Articulos.cantidadPiezasRib','La cantidad de piezas de rib es obligatorio').not().isEmpty(),
        // check('Articulos.color','El color es  obligatorio').not().isEmpty(),
        check('fecha','La fecha es obligatoria').not().isEmpty(),
        validarCampos
    ],
    crearSolicitudTintoreria);


    /*BORRAR  REMITO TINTORERIA */
router.delete('/delete/:solicitudTintoreria',[
   
    check('nroSolicitudTintoreria','El número de remito es obligatorio.').not().isEmpty(),
    validarCampos

],
borrarSolicitudTintoreria);



    /* MODIFICACION DE SOLICITUD TINTORERIA*/
router.put('/modify/:solicitudTintoreria',[

    check('nroSolicitudTintoreria','El número de remito es obligatorio.').not().isEmpty(),
    check('nroPartida','El número de partida es obligatorio.').not().isEmpty(),
    check('remitoHilanderia','El número de remito es obligatorio.').not().isEmpty(),
    // check('Articulos.idArticulo','El articulo es obligatorio').not().isEmpty(),
    // check('Articulos.descripcion','La descripción es obligatoria').not().isEmpty(),
    // check('Articulos.cantidadKgs','La cantidad de kgs es obligatorio').not().isEmpty(),
    // check('Articulos.cantidadKgsRib','La cantidad de kgs de rib es obligatorio').not().isEmpty(),
    // check('Articulos.cantidadPiezas','La cantidad de piezas es obligatorio').not().isEmpty(),
    // check('Articulos.cantidadPiezasRib','La cantidad de piezas de rib es obligatorio').not().isEmpty(),
    // check('Articulos.color','El color es  obligatorio').not().isEmpty(),
    check('fecha','La fecha es obligatoria').not().isEmpty(),
        validarCampos
    ],
    modificarSolicitudTintoreria);


    /*OBTENER REMITO Tintoreria */
router.get('/solicitud', obtenerSolicitudTintoreria);


    /*OBTENER REMITO UNICO DE HILANDERIA */
    router.get('/solicitudUnica/:solicitudTintoreria', obtenerSolicitudUnicaTintoreria);


module.exports = router;