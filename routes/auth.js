/*   RUTAS DE USUARIOS /AUTH
    HOST + /api/auth  */


const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, renewToken: revalidarToken,borrarUsuario, modificarUsuario, obtenerUsuarios} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');
const router = Router();


/*CREAR USUARIO */
router.post(
    '/new',
    [
        check('name','El usuario es obligatorio').not().isEmpty(),
        check('nombre','El nombre debe ser obligatorio').not().isEmpty(),
        check('apellido','El apellido debe ser obligatorio').not().isEmpty(),
        check('dni','El dni debe ser obligatorio').not().isEmpty(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
        check('perfil','El perfil debe ser obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearUsuario);

    /**LOGIN DE USUARIO */
router.post(
    '/',
    [
        check('name','El usuario es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario);

    /*REVALIDAR TOKEN DE SESION*/
router.get('/renew',validarJWT,revalidarToken);

/*BORRAR UN USUARIO */
router.delete('/delete/:name',[
   
    check('name','El usuario es obligatorio').not().isEmpty(),
    validarCampos

],
borrarUsuario);



/* MODIFICACION DE USUARIO*/
router.put('/modify/:name',[

    check('name','El usuario es obligatorio').not().isEmpty(),
    check('nombre','El nombre debe ser obligatorio').not().isEmpty(),
    check('apellido','El apellido debe ser obligatorio').not().isEmpty(),
    check('dni','El dni debe ser obligatorio').not().isEmpty(),
    check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
    check('perfil','El perfil debe ser obligatorio').not().isEmpty(),
    validarCampos
    ],
    modificarUsuario);


    /*OBTENER USUARIO */

    router.get('/usuarios', obtenerUsuarios);


module.exports = router;