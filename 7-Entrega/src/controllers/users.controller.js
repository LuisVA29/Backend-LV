const config = require("../config/config")
const jwt = require("jsonwebtoken");
const passport = require("passport");

const secret = config.JWT_SECRET

const logoutUserCtrl = async(req, res) => {
    res.clearCookie('jwt')
    .status(200)
    .json({
        message: 'You have logged out'
    })
}

const loginUserCookieCtrl = async(req, res) => {
    const token = jwt.sign(JSON.stringify(req.user), secret)
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      signed: true,
      maxAge: 1000 * 60 * 30 // 30 min
    })
  
    res.redirect('/');
  }

  const currentUserCtrl = async(req, res) => {
    if (!req.user) {
      return res.status(401).send({ message: "Acceso denegado. Token inválido o expirado." })
    }
      
    return res.status(200).send({ status: "ok",
                cookieJWT: req.signedCookies['jwt'],
                JWTPayload: req.user
      })
  }

module.exports = {
    logoutUserCtrl,
    loginUserCookieCtrl,
    currentUserCtrl
}