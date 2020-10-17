/*   RUTAS DE USUARIOS /CLIENTE
    HOST + /api/cliente  */


 const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {crearCliente, borrarCliente, modificarCliente} = require('../controllers/cliente')
const router = Router();


/*CREAR CLIENTE */
router.post(
    '/new',
    [
        check('idRegistro', 'El idRegistro es obligatorio').not().isEmpty(),
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCliente);


    /*BORRAR  CLIENTE */
router.delete('/delete/:idRegistro',[
   
    check('idRegistro', 'El idRegistro es obligatorio').not().isEmpty(),
    validarCampos

],
borrarCliente);



/* MODIFICACION DE USUARIO*/
router.put('/modify/:idRegistro',[
   
    check('idRegistro', 'El idRegistro es obligatorio').not().isEmpty(),
    validarCampos

    ],
    modificarCliente);


module.exports = router;