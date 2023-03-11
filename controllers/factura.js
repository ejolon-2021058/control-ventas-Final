const { request, response } = require('express');
const Factura = require('../models/factura');
const Producto = require('../models/producto');
const Carrito = require('../models/carrito');



const getFactura = async (req = request, res = response) => {


    const factura = await Promise.all([
        Factura.countDocuments(),
        Factura.find()
            .populate('usuario')
            .populate('carrito')
    ]);

    res.json({
        msg: 'FACTURA EMITIDA',
        factura
    });

}
const getFacturaPorID = async (req = request, res = response) => {
    const _id = req.usuario.id;
    const query = { usuario: _id };
  
    const listafactura = await Promise.all([
      Factura.countDocuments(query),
      Factura.find(query),
    ]);
  
    res.json({
      msg: "get Api - Mis Facturas Emitidas",
      listafactura,
    });
    
};


const postFactura = async (req = request, res = response) => {

    const { usuario, ...body } = req.body;

    //Generar la data a guardar
    const data = {
        ...body,
        usuario: req.usuario._id,
    }

    const factura = await Factura( data );

    //Guardar en DB
    await factura.save();

    res.status(201).json( factura );
   
}

module.exports = {
    getFactura,
    getFacturaPorID,
    postFactura
}
