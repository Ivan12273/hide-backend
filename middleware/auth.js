const jwt = require('jsonwebtoken');
const seed = process.env.AUTH_SEED;

const verifyToken = (req, res, next) => {
  //Se obtiene el token asignado al usuario
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({
      message: "No se ha autentificado"
    });
  }

  //Se verifica que el token sea valido y se obtiene el id del usuario
  jwt.verify(token, seed, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No estas autenticado!"
      });
    }
    res.userId = decoded.user._id;
    res.user = decoded.user;

    next();
  });
};

const authRole = (roles) => {
  return (req, res, next) => {
    let user_role = res.user.role;
    if (!roles.includes(user_role)) {
      res.status(401)
      return res.send("Not role permission")
    }

    next()
  }
}

/*
  Autoriza una petición si el usuario es ADMIN
  o el id del usuario que se pide es igual al id
  del usuario que realzia la petición, es decir,
  le pertenecen los datos 
*/
const authUser = (req, res, next) => {
  if (!(res.user.role == "ADMIN" || req.params.id == res.user._id)) {
    // console.log("No es admin ni le pertenecen los datos");
    res.status(403)
    return res.send("Not authorized")
  }
  next()
}

module.exports = {
  verifyToken,
  authRole,
  authUser
};