'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: 0
    }
});

//Valida que el nombre del producto sea único
ProductSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('Product', ProductSchema);