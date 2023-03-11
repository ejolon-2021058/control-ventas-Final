//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putUsuario, deleteUsuario, deletePerfil, deleteUsuarios, putPerfil, putUsuarios } = require('../controllers/usuario');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrarUsuarios', getUsuarios);

router.post('/RegistrarAdmin', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom(  esRoleValido ),
    validarCampos,
] ,postUsuario);

router.post('/RegistrarCliente', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').default("CLIENTE_ROLE").custom(esRoleValido ),
    validarCampos,
] ,postUsuario);


router.put('/editarPerfil/', [
    validarJWT,
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    validarCampos,
] ,putPerfil);

router.put('/editarUsuarios/:id', [
    validarJWT,
    validarCampos,
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    esAdminRole
] ,putUsuarios);


router.delete('/eliminarPerfil', [
    validarJWT,
    validarCampos
] ,deletePerfil);

router.delete('/eliminarUsuarios/:id',[
    validarJWT,
    esAdminRole
], deleteUsuarios);

module.exports = router;

