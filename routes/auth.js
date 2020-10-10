/*   RUTAS DE USUARIOS /AUTH
    HOST + /api/auth  */


const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();
const {crearUsuario, loginUsuario, renewToken: revalidarToken} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');
const Usuario = require('../models/Usuario')


router.post(
    '/new',
    [
        check('name','El usuario es obligatorio').not().isEmpty(),
        check('nombre','El nombre debe ser obligatorio').not().isEmpty(),
        check('apellido','El apellido debe ser obligatorio').not().isEmpty(),
        check('dni','El dni debe ser obligatorio').not().isEmpty(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('name','El usuario es obligatorio').not().isEmpty(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
        check('empresa','La empresa es obligatoria').not().isEmpty(),
        validarCampos
    ],
    loginUsuario);

router.get('/renew',validarJWT,revalidarToken);


router.delete('/delete/:name', async(req, res) => {

  
    let name = req.params.name;

    await Usuario.deleteOne({name}, (err, userDeleted) => {
        console.log(name);
        

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no existe"
                }
            })

        }

        res.json({
            status: 'Usuario borrado',
            ok: true,
            usuario: userDeleted
        });


    });

});


const getUserByID = ()=>{

}

module.exports = router;