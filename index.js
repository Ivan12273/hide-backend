require('./config/config.js');

'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT;
var uri = process.env.DB_URI;
var host = process.env.BACK_URL;

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log(`Servidor iniciado correctamente en ${host}:${port}/`);
        });
    })
    .catch(err => console.log(err));



module.exports = app; // for testing