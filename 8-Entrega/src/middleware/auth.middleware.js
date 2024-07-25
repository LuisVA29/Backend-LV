import passport from "passport";

function authMdw(role) {
  return (req, res, next) => {

  if (role.length === 1 && role[0] === "PUBLIC") {
    return next();
  }

  passport.authenticate("jwt", { session: false }, (err, userJWT, info) => {
    if (err) {
      return next(err)
    }
    console.log(userJWT)
    
    if (!userJWT) {
      return res
        .status(401)
        .send({ message: "Acceso denegado. Token inválido o expirado." });
    }

    
    const currentRole = userJWT.role
    if (!role.includes(currentRole)){
      return res
        .status(401)
        .send({ message: "Acceso prohibido." });
    }
      req.user = userJWT
      return next()
  })(req, res, next)
}}

function authMdwFront(req, res, next) {
    if (!req.signedCookies['jwt']) {
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
    if (req.signedCookies['jwt']) {
      return res.redirect("/")
    }
  
    return next()
  }
  
  export { authMdwFront,
     loggedRedirect,
     authMdw
    }