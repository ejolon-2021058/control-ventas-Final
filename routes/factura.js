const { Router } = require('express');
const { getCategoriaPorID } = require('../controllers/categoria');
const { getFactura, postFactura, getFacturaPorID } = require('../controllers/factura');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');

const router = Router();
//Obtener todas las productos - publico
router.get('/MostrarFacturas', getFactura );

router.get('/MisFacturas',[
    validarJWT,
    validarCampos
],getFacturaPorID);

// Crear producto - privada - cualquier persona con un token válido
router.post('/agregarFactura', [
    validarJWT,
    validarCampos
], postFactura);

module.exports = router;