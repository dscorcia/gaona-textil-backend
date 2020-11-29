const {Router} = require('express');
    const {check} = require('express-validator');
    const {validarCampos} = require('../middlewares/validar-campos');
    const {} = require('../controllers/stock');
    const router = Router();

    module.exports=router;