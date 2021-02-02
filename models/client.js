'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let ClientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    phone: {
        type: [String],
        unique: true
    },
    location: [{
        type: [Object],
        address: {
            type: String
        },
        addressDescription: {
            type: String
        },
        coordinates: {
            type: String
        }
    }]
});

module.exports = mongoose.model('Client', ClientSchema);