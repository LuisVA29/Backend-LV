const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const UserManagerService = require("../service/user.service")
const userManager = new UserManagerService()
const jwt = require("passport-jwt");
const config = require("./config")

const JWTStrategy = jwt.Strategy;
const secret = config.JWT_SECRET

const GITHUB_CLIENT_ID = config.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = config.GITHUB_CLIENT_SECRET

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {

        const { first_name, last_name, age, email } = req.body;

        try {
          let user = await userManager.checkUser(email)
          if (user) {
            return done(null, false);
          }

          const newUser = await userManager.addUser(first_name, last_name, email, Number(age), password)

          if (!newUser) {
            return res
              .status(500)
              .json({ message: `we have some issues register this user` });
          }

          return done(null, newUser);
        } catch (error) {
            throw Error(error)
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          let user = await userManager.checkUserAndPass(username, password)

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile._json)
          let user = await userManager.checkUser(profile._json?.email);
          if (!user) {
            let addNewUser = {
              first_name: profile._json.name,
              last_name: "No LastName", //areglar esto
              email: profile._json?.email,
              age: 18,
              password: "GenerarPassHasheadaRandom", //y esto
            };
            console.log(addNewUser)
            let newUser = await userManager.addUser(addNewUser.first_name, addNewUser.last_name, addNewUser.email, addNewUser.age, addNewUser.password);
            done(null, newUser);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  const cookieExtractor = req => {
    let token = null 

    if (req && req.cookies) {
        token = req.signedCookies['jwt']
    }

    return token
}

passport.use('jwt', new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: secret
}, async (jwtPayload, done) => {
  try {
    done(null, jwtPayload)
  } catch (error) {
    done(error)
  }
}))

};

module.exports = initializePassport;