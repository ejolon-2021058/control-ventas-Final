const { Schema, model } = require('mongoose');

const CarritoSchema = Schema({
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    }],
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true 
    },
    total:{
        type: Number,
        default: 0
    }
});


module.exports = model('Carrito', CarritoSchema);