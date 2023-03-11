const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Usuario = require('../models/usuario');
const rol = require('../models/role');

const getUsuarios = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Usuario',
        listaUsuarios
    });

}

const postUsuario = async (req = request, res = response) => {

    //Desestructuración
    const { nombre, correo, password, rol } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await usuarioGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Usuario',
        usuarioGuardadoDB
    });

}


const putUsuarios = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id, img, google, ...resto } = req.body;
    const userUpdate = await Usuario.findById(req.params.id);
    //Si la password existe o viene en el req.body, la encripta
    if (resto.password) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    if (userUpdate.rol !== 'ADMIN_ROLE') {
        //Editar al usuario por el id
        const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

        res.json({
            msg: 'PUT editar user',
            usuarioEditado
        });

    } else {
        res.status(403).send('No tienes permiso para editar a otro administrador.');
    }
}

const putPerfil = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const idU = req.usuario.id;
    const { _id,rol, estado, ...resto } = req.body;

    //Si la password existe o viene en el req.body, la encripta
    if (resto.password) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const usuarioEditado = await Usuario.findByIdAndUpdate(idU, resto, { new: true });

    res.json({
        msg: 'PUT Perfil editado con exito',
        usuarioEditado
    });

}



const deletePerfil = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const idE = req.usuario.id;
    //Eliminar fisicamente de la DB
    const usuarioEliminado = await Usuario.findByIdAndDelete(idE, { new: true });
    res.json({
        msg: 'DELETE eliminar user',
        usuarioEliminado
    });
}

const deleteUsuarios = async (req = request, res = response) => {
    const { id } = req.params;
    const userToDelete = await Usuario.findById(req.params.id);
    if (userToDelete.rol !== 'ADMIN_ROLE') {
        const deletedUser = await Usuario.findByIdAndDelete(req.params.id);
        res.json({
            msg: 'DELETE eliminar user',
            deletedUser
        });
    } else {
        res.status(403).send('No tienes permiso para eliminar a otro administrador.');
    }
}


module.exports = {
    getUsuarios,
    postUsuario,
    putPerfil,
    putUsuarios,
    deletePerfil,
    deleteUsuarios
}

