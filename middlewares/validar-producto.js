const { request, response } = require('express');
const Producto = require('../models/producto');

const validarCantidadStock = async (req = request, res = response, next) => {
    const { productos, numeroProductos } = req.body;
  
    for (let i = 0; i < productos.length; i++) {
      const numeroProducto = numeroProductos[i];
      const producto = productos[i];
  
      const ProductoDB = await Producto.findById(producto);
      if (ProductoDB) {
        if (ProductoDB.disponible === false) {
          return res.status(400).json({
            msg: "Producto no esta disponible",
          });
        }
  
        if (numeroProducto > ProductoDB.cantidad) {
          return res.status(405).json({
            msg: `El producto no tiene esa cantidad`,
          });
        }
      }
    }
  
    next();
};

module.exports = {
    validarCantidadStock,
}