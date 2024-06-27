const passport = require("passport");

function authMdw(req, res, next) {/// TODO implementar roles, cambiar modelo
    if (!req.cookies['jwt']) {
      return res.redirect("/login")
    }

    passport.authenticate("jwt", { session: false }, (err, userJWT, info) => {
      if (err) {
        return next(err);
      }
      if (!userJWT) {
        return res
          .status(401)
          .send({ message: "Acceso denegado. Token inválido o expirado." });
      }
        req.user = userJWT;
        return next();
    })(req, res, next);
}

  function loggedRedirect(req, res, next) {
    if (req.cookies['jwt']) {
      return res.redirect("/")
    }
  
    return next()
  }
  
  module.exports = { authMdw,
     loggedRedirect
    }