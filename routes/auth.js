/*   RUTAS DE USUARIOS /AUTH
    HOST + /api/auth  */


const {Router} = require('express');
const router = Router();
const {crearUsuario, loginUsuario, renewToken: revalidarToken} = require('../controllers/auth')



router.post('/new',crearUsuario);

router.post('/',loginUsuario);

router.get('/renew',revalidarToken);


module.exports = router;