'use strict'

const PasswordReset = require('../models/passwordReset');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail } = require('./mailables/auth')

var controller = {
  login: (req, res) => {

    let params = req.body;

    User.findOne({ email: params.email }, (erro, DBuser) => {
      if (erro) {
        return res.status(400).send({
          message: erro
        })
      }
      // Verifica que exista un usuario con el mail escrita por el usuario.
      if (!DBuser) {
        return res.status(400).send({
          email: { message: "El usuario no coincide con nuestros registros" }
        })
      }

      //Se verifica quie la cuenta no este bloqueada
      if (DBuser.login_tries >= 3) {

        addFailedLoginPont(DBuser._id);

        if (DBuser.login_tries == 3) {
          createRestorePassword(DBuser._id, params.email);
        }

        return res.status(400).send({
          login: { message: "Cuenta bloqueada. Revise su correo electronico." }
        });
      }

      // console.log('cuenta bloqueada');

      // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
      if (!bcrypt.compareSync(params.password, DBuser.password)) {

        //Se suma uno al contador de intentos fallidos
        addFailedLoginPont(DBuser._id);

        return res.status(400).send({
          password: { message: "Contraseña incorrecta" }
        });
      }

      restoreLoginPoins(DBuser._id);

      // Genera el token de autenticación
      let token = jwt.sign({
        user: DBuser,
      }, process.env.AUTH_SEED, {
        expiresIn: process.env.TOKEN_EXP
      });

      return res.status(200).send({ user: DBuser, token: token });

    })
  },

  password_reset: (req, res) => {
    let params = req.body;
    // console.log(req.body);

    User.findOne({ email: params.email }, (erro, DBuser) => {
      if (erro) {
        return res.status(400).send({
          message: erro
        });
      }
      // Verifica que exista un usuario con el mail escrita por el usuario.
      if (!DBuser) {
        return res.status(404).send({
          message: "El usuario no coincide con nuestros registros"
        })
      }

      if (createRestorePassword(DBuser._id, params.email) == false) {
        return res.status(404).send({
          message: "No se pudo enviar un email de recuperación"
        })
      }

      return res.status(200).send({
        message: "¡Email de recuperación enviado exitosamente!"
      })


    });
  },

  password_update: (req, res) => {
    let new_pass = req.body.password;
    let token = req.body.token;
    let userId = req.body.userId;

    PasswordReset.findOne({ userId: userId, passwordResetToken: token }, (erro, DBReset) => {
      if (erro) {
        return res.status(400).send({
          message: erro
        })
      }

      // Verifica que exista un reset con el token escrita por el usuario.
      if (!DBReset) {
        return res.status(404).send({
          message: "No existe una petición de reinicio de contraseña"
        })
      }

      new_pass = bcrypt.hashSync(new_pass, 10);

      User.findByIdAndUpdate(userId, { password: new_pass, login_tries: 0 }, { new: true, runValidators: true }, (err, userUpdated) => {
        if (err) return res.status(400).send({ message: err.errors });

        if (!userUpdated) return res.status(404).send({ message: 'No existe el usuario para actualizar' });

        return res.status(200).send({
          user: userUpdated
        });
      });
    })
  },

  auth_user: (req, res) => {
    const seed = process.env.AUTH_SEED;

    let token = req.headers.authorization;

    jwt.verify(token, seed, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          message: "No estas autenticado!"
        });
      }
      res.userId = decoded.user._id;
      let user = decoded.user;

      return res.status(200).send({
        user: user
      });
      // return { user: user }
    });

  }

};

const createRestorePassword = (id, email) => {

  let token = crypto.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)

  //Se crea un registro de password reset
  PasswordReset.create({
    userId: id,
    passwordResetToken: token,
    date: Date.now()
  }).then(function (item) {
    if (!item)
      return false

    //Se envía el correo de restauración
    sendPasswordResetEmail(email, id, token);

    return true;

  }).catch(error => {
    console.log(error);
  })
}

const addFailedLoginPont = (id) => {
  User.findOneAndUpdate({ _id: id },
    { $inc: { 'login_tries': 1 } },
    { new: true },
    function (err, response) {
      // console.log(response);
    });
}

const restoreLoginPoins = (id) => {
  User.findByIdAndUpdate(id, { login_tries: 0 }, { new: true, runValidators: true }, (err, userUpdated) => {
    if (err) return false;

    if (!userUpdated) return false;

    return true;
  });

}

module.exports = controller;