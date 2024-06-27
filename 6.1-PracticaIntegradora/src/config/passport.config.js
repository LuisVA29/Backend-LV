const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const DBUserManager = require("../dao/DBUserManager");
const userModel = require("../dao/models/user.models");
const userManager = new DBUserManager();
const jwt = require("passport-jwt");

const JWTStrategy = jwt.Strategy;
const secret = "JWTSECRET";

const GITHUB_CLIENT_ID = "Iv23ctKNlp5s0yZdqaZT";
const GITHUB_CLIENT_SECRET = "8b52372d40ee271b95bbc406f887e311a0e6a2de";

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
          let user = await userManager.checkUser(email);
          if (user) {
            return done(null, false);
          }

          const newUser = await userManager.addUser(
            first_name,
            last_name,
            email,
            Number(age),
            password
          );

          if (!newUser) {
            return res
              .status(500)
              .json({ message: `we have some issues register this user` });
          }

          return done(null, newUser);
        } catch (error) {
          throw Error(error);
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
          let user = await userManager.checkUserAndPass(username, password);

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
          console.log(profile._json);
          let user = await userManager.checkUser(profile._json?.email);
          if (!user) {
            let addNewUser = {
              first_name: profile._json.name,
              last_name: "No LastName", //areglar esto
              email: profile._json?.email,
              age: 18,
              password: "GenerarPassHasheadaRandom", //y esto
            };
            console.log(addNewUser);
            let newUser = await userManager.addUser(
              addNewUser.first_name,
              addNewUser.last_name,
              addNewUser.email,
              addNewUser.age,
              addNewUser.password
            );
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

  const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {
      token = req.cookies["jwt"];
    }

    return token;
  };

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: secret,
      },
      async (jwtPayload, done) => {
        try {
          done(null, jwtPayload);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
