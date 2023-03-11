const { request, response, json } = require('express');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');
const Carrito = require('../models/carrito');

const postCarrito = async (req = request, res = response) => {
    const { productos, cantidadProductos } = req.body;
    let totales = 0;
    let totalFinal = 0;


    for (let i = 0; i < productos.length; i++) {
        const cantidadxProducto = cantidadProductos[i];
        const listaProductos = productos[i];
        const query = await Producto.findById(listaProductos);
        let precio = query.precio;
        let cantidad = parseInt(cantidadxProducto);
    
        totales = precio * cantidad;
    
        totalFinal = totales + totalFinal;
    }
    
    const data = {
        usuario: req.usuario._id,
        productos: [...req.body.productos],
        total: totalFinal,
    }

    const carrito = new Carrito(data);
    //Guardar en DB
    await carrito.save();

    res.status(201).json({
        msg: 'Carrito de Compras:',
        carrito,
    });

}


module.exports = {
    postCarrito
}