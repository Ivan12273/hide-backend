'use strict'

var Client = require('../models/client');

var controller = {

    createClient: function (req, res) {
        var client = new Client();

        var params = req.body;
        client.name = params.name;
        client.phone = params.phone;
        client.location = params.location;

        client.save((err, clientStored) => {
            if (err) return res.status(400).send({ message: err });

            if (!clientStored) return res.status(404).send({ message: 'No se ha podido guardar el cliente.' });

            return res.status(201).send({ client: clientStored });
        });

    },

    getClient: function (req, res) {
        var clientId = req.params.id;

        if (clientId == null) return res.status(404).send({ message: 'El cliente no existe.' });

        Client.findById(clientId, (err, client) => {
            if (err) return res.status(400).send({ message: err });

            if (!client) return res.status(404).send({ message: 'El cliente no existe.' })

            return res.status(200).send({
                client
            });
        });
    },

    getAllClients: function (req, res) {
        Client.find({}).sort('').exec((err, clients) => {

            if (err) return res.status(400).send({ message: 'Error al devolver los datos.' });

            if (!clients) return res.status(404).send({ message: 'No hay clientes que mostrar.' });

            return res.status(200).send({ clients });
        });
    },

    updateClient: function (req, res) {
        var clientId = req.params.id;
        var update = req.body;

        Client.findByIdAndUpdate(clientId, update, { new: true, runValidators: true, context: 'query' }, (err, clientUpdated) => {
            if (err) return res.status(400).send({ message: err.errors });

            if (!clientUpdated) return res.status(404).send({ message: 'No existe el cliente para actualizar' });

            return res.status(200).send({
                client: clientUpdated
            });
        });
    },

    deleteClient: function (req, res) {
        var clientId = req.params.id;

        Client.findByIdAndRemove(clientId, (err, clientRemoved) => {
            if (err) return res.status(400).send({ message: 'No se ha podido borrar al cliente.' });

            if (!clientRemoved) return res.status(404).send({ message: 'No se puede eliminar al cliente.' });

            return res.status(200).send({
                client: clientRemoved
            });
        });
    }

};

module.exports = controller;