'use strict'

var Product = require('../models/product');

var controller = {

    createProduct: function (req, res) {
        var product = new Product();
        var params = req.body;

        product.name = params.name;
        product.description = params.description;
        product.stock = params.stock;
        product.price = params.price;

        product.save((err, productStored) => {
            if (err) return res.status(400).send({ message: err });

            if (!productStored) return res.status(404).send({ message: 'No se ha podido guardar el producto.' });

            return res.status(201).send({ product: productStored });
        });
    },

    getAllProducts: (req, res) => {
        Product.find({}).sort('').exec((err, products) => {

            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

            if (!products) return res.status(404).send({ message: 'No hay productos que mostrar.' });

            return res.status(200).send({ products });
        });
    },

    getProduct: (req, res) => {
        var productId = req.params.id;

        if (productId == null) return res.status(404).send({ message: 'El producto no existe.' });

        Product.findById(productId, (err, product) => {
            if (err) return res.status(404).send({ message: err });

            if (!product) return res.status(404).send({ message: 'El producto no existe.' })

            return res.status(200).send({
                product
            });
        });
    },

    updateProduct: function (req, res) {
        var productId = req.params.id;
        var update = req.body;

        Product.findByIdAndUpdate(productId, update, { new: true, runValidators: true, context: 'query' }, (err, productUpdated) => {
            if (err) return res.status(400).send({ message: err.errors });

            if (!productUpdated) return res.status(400).send({ message: 'No existe el producto para actualizar' });
            return res.status(200).send({
                product: productUpdated
            });
        });
    },
    deleteProduct: function (req, res) {
        var productId = req.params.id;

        Product.findByIdAndRemove(productId, (err, productRemoved) => {
            if (err) return res.status(400).send({ message: 'No se ha podido borrar el producto.' });

            if (!productRemoved) return res.status(404).send({ message: 'No se puede eliminar el producto.' });

            return res.status(200).send({
                product: productRemoved
            });
        });
    }

};

module.exports = controller;