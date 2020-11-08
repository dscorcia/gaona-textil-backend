/*   RUTAS DE USUARIOS /CLIENTE
    HOST + /api/factura  */


    const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const {} = require('../controllers/factura');
    const { obtenerFacturas, modificarFactura, borrarFactura, crearFactura } = require('../controllers/factura');
    const router = Router();
    
    
    /*CREAR FACTURA */
    router.post(
        '/new',
        [
            
            check('nroRemito','El número de remito es obligatorio').not().isEmpty(),
            check('nroFactura','El número de factura es obligatorio').not().isEmpty(),
            check('articulo','El artículo es obligatorio').not().isEmpty(),
            check('fecha','La fecha es obligatorio').not().isEmpty(),
            check('kgs','Los kilos es obligatorio').not().isEmpty(),
            check('precio','El precio es obligatorio').not().isEmpty(),
            check('proveedor','El proveedor es obligatorio').not().isEmpty(),
            check('estado','El estado es obligatorio').not().isEmpty(),
             validarCampos
        ],
        crearFactura);
    
    
        /*BORRAR  FACTURA */
    router.delete('/delete/:nroFactura',[
       
        check('nroFactura', 'El número de factura es obligatorio').not().isEmpty(),
        validarCampos
    
    ],
    borrarFactura);
    
    
    
    /* MODIFICACION DE CLIENTE*/
    router.put('/modify/:nroFactura',[
       
        check('nroFactura', 'El nroFactura es obligatorio').not().isEmpty(),
        validarCampos
    
        ],
        modificarFactura);
    
    /*OBTENER CLIENTES */
    
    router.get('/facturas', obtenerFacturas);
    
    
    
    module.exports = router;