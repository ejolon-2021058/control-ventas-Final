const { postCarrito } = require('../controllers/carrito');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();

//router.get('/mostrar', );

router.post('/llenarCarrito', [
    validarJWT,
    validarCampos
] ,postCarrito);


module.exports = router;