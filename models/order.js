'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let validStatus = {
    values: ["Nuevo", "Preparación", "Preparado", "Transito", "Entregado", "Cancelado"],
    message: '{VALUE} no es un status válido'
}

let OrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Se requiere el usuario']
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: [true, 'Se requiere el cliente']
    },
    status: {
        type: String,
        default: 'Nuevo',
        required: [true],
        enum: validStatus,
    },
    date: {
        type: Date,
        required: [true, "Se requiere la fecha del pedido."]
    },
    details: [
        {
            product_id: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                min: 0
            }
        }],
    address: {
        type: String,
        required: [true, 'Se requiere la dirección']
    },
    phone: {
        type: String,
        required: [true, 'Se requiere el telefono']
    }
});


module.exports = mongoose.model('Order', OrderSchema);