const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_SENDER_USER,
    pass: process.env.MAIL_SENDER_PASS
  }
});


const sendPasswordResetEmail = (email, userId, token) => {

  var mailOptions = {
    from: 'Hide software',
    to: email,
    subject: 'Reestablecimiento de cuenta',
    html: '<h4><b>HIDE software</b></h4>' +
      '<p>Si has perdido el acceso a tu cuenta puedes reestablecer el acceso con el siguiente enlace:</p>' +
      `<a href='${process.env.FRONT_URL}/login/reset-password/${userId}/${token}'>Reset password</a>` +
      '<hr>' +
      '<small>La información contenida en este correo electronico es confidencial. Si usted ha recibido este email por equivocación reportelo a roostersoftware.hide.com.</small>' +
      '<br><br>' +
      `<p>-- ${process.env.APP_NAME} --</p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).send({ message: "No se pudo enviar el email" });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send({ message: "Se ha enviado el correo de restauración" });
    }
  });

}

const sendNewUserEmail = (user, password) => {

  var mailOptions = {
    from: 'Hide Software',
    to: user.email,
    subject: 'Bienvenido a hide software',
    html: '<h4><b>HIDE software</b></h4>' +
      '<p>El administrador del sistema te ha registrado exitosamente en hide software</p>' +
      '<p>Tus credenciales de acceso son las siguientes:</p>' +
      `<p>Usuario de acceso: <strong> ${user.email} </strong></p>` +
      `<p>Contraseña: <strong> ${password} </strong></p>` +
      '<hr>' +
      '<p>Es importante que, al ingresar al sistema actualices tu contraseña de acceso. Si tienes dudas contacta al administrador del sistema.</p>' +
      '<hr>' +
      '<small>La información contenida en este correo electronico es confidencial. Si usted ha recibido este email por equivocación reportelo a roostersoftware.hide.com.</small>' +
      '<br><br>' +
      `<p>-- ${process.env.APP_NAME} --</p>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).send({ message: "No se pudo enviar el email" });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).send({ message: "Se ha enviado el correo de restauración" });
    }
  });


}


module.exports = {
  sendPasswordResetEmail,
  sendNewUserEmail
};