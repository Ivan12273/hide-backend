'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
    values: ["ADMIN", "USER", "SALES", "PREPARATION", "STOCKS", "DELIVERINGS"],
    message: '{VALUE} no es un role válido'
}

var Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    birthday: {
        type: String,
        required: [true, 'La fecha de nacimiento es necesaria'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password: {
        type: String,
        required: [true, "Le contraseña es obligatoria"],
    },
    role: {
        type: String,
        default: 'USER',
        required: [true],
        enum: validRoles,
    },
    login_tries: {
        type: Number,
        default: 0,
        min: 0
    }
});

//Se elimina el password al retornar los datos del usuario
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//Se valida que el email sea válido
UserSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('User', UserSchema);