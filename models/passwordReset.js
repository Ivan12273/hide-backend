'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let PasswordResetSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'El id es necesario'],
    },
    passwordResetToken: {
        type: String,
        required: [true, 'El token es necesario'],
    },
    date: {
        type: Date,
        required: [true, 'La fecha es necesaria'],
    }
});

module.exports = mongoose.model('PasswordReset', PasswordResetSchema);