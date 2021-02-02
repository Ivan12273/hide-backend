'use strict'

var User = require('../models/user');
const bcrypt = require('bcrypt');
const { sendNewUserEmail } = require('./mailables/auth')

var controller = {

    test: function (req, res) {
        return res.status(200).send({
            message: 'Fabiola best waifu <3333',
        });
    },

    createUser: function (req, res) {
        var user = new User();
        let password = '';

        var params = req.body;
        user.name = params.name;
        user.birthday = params.birthday;
        user.email = params.email;
        user.role = params.role;

        if (params.password != undefined) {
            user.password = bcrypt.hashSync(params.password, 10);
            password = params.password;
        } else {
            password = Math.random().toString(36).slice(-8);
            user.password = bcrypt.hashSync(password, 10);
        }
        //Password generado aleatoriamente
        // console.log(`Password antes del hash: ${password}`);
        // console.log(`Password después del hash: ${bcrypt.hashSync(password, 10)}`);

        //Se hashea el password

        user.save((err, userStored) => {
            if (err) return res.status(400).send({ message: err });

            if (!userStored) return res.status(404).send({ message: 'No se ha podido guardar el usuario.' });

            //Se envía el correo al usuario con sus datos
            sendNewUserEmail(user, password);

            return res.status(201).send({ user: userStored });
        });

    },

    getUser: function (req, res) {
        var userId = req.params.id;

        if (userId == null) return res.status(404).send({ message: 'El usuario no existe.' });

        User.findById(userId, (err, user) => {
            if (err) return res.status(400).send({ message: err });

            if (!user) return res.status(404).send({ message: 'El usuario no existe.' })

            return res.status(200).send({
                user
            });
        });
    },

    getAllUsers: function (req, res) {

        User.find({}).sort('').exec((err, users) => {

            if (err) return res.status(400).send({ message: 'Error al devolver los datos.' });

            if (!users) return res.status(404).send({ message: 'No hay usuarios que mostrar.' });

            return res.status(200).send({ users });
        });
    },

    updateUser: function (req, res) {
        var userId = req.params.id;
        var update = req.body;

        //Solo se hashea si se pasa una nueva
        if (update.password != undefined) {
            update.password = bcrypt.hashSync(update.password, 10);
        }


        User.findByIdAndUpdate(userId, update, { new: true, runValidators: true, context: 'query' }, (err, userUpdated) => {
            if (err) return res.status(400).send({ message: err.errors });


            if (!userUpdated) return res.status(404).send({ message: 'No existe el usuario para actualizar' });

            return res.status(200).send({
                user: userUpdated
            });
        });
    },

    deleteUser: function (req, res) {
        var userId = req.params.id;

        User.findByIdAndRemove(userId, (err, userRemoved) => {
            if (err) return res.status(400).send({ message: 'No se ha podido borrar al usuario.' });

            if (!userRemoved) return res.status(404).send({ message: 'No se puede eliminar al usuario.' });

            return res.status(200).send({
                user: userRemoved
            });
        });
    }

};

module.exports = controller;