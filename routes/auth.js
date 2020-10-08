/*   RUTAS DE USUARIOS /AUTH
    HOST + /api/auth  */


const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();
const {crearUsuario, loginUsuario, renewToken: revalidarToken} = require('../controllers/auth');



router.post(
    '/new',
    [
        check('name','El usuario es obligatorio').not().isEmpty(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('name','El usuario es obligatorio').not().isEmpty(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew',revalidarToken);


module.exports = router;