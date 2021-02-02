'use strict'

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
var host = process.env.BACK_URL;


// cargar archivos rutas
var userRoutes = require('./routes/user');
var clientRoutes = require('./routes/client');
var authRoutes = require('./routes/auth');
var productRoutes = require('./routes/product');
var productAPIRoutes = require('./routes/product.api');
var orderRoutes = require('./routes/order');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
// Siempre se va a ejecutar esto antes de cada petición
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `http://${host}:4200`);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next(); // Pasará a la ejecución de lo siguiente
});

// rutas,no utilzian prefijo
app.use('/', userRoutes);
app.use('/', clientRoutes);
app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/api/', productAPIRoutes);

// exportar
module.exports = app;