/*   RUTAS DE USUARIOS /CLIENTE
    HOST + /api/cliente  */


 const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {crearCliente} = require('../controllers/cliente')
const router = Router();


/*CREAR CLIENTE */
router.post(
    '/new',
    [
        check('razonSocial','La razon social es obligatoria').not().isEmpty(),
        check('cuit','El Cuit/Cuil es obligatorio').not().isEmpty(),
        check('telefono','El telefono es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCliente);

    module.exports = router;