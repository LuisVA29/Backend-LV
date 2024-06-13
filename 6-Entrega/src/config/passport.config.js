const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const DBUserManager = require("../dao/DBUserManager");
const userModel = require("../dao/models/user.models");
const userManager = new DBUserManager();

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
        const { first_name, last_name, email } = req.body;

        try {
          let user = await userManager.checkUser(email);
          if (user) {
            return done(null, false);
          }

          const newUser = await userManager.addUser(
            first_name,
            last_name,
            email,
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
          console.log(user);
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
          let user = await userManager.checkUser(profile._json?.email);
          if (!user) {
            let addNewUser = {
              first_name: profile._json.name,
              last_name: "No LastName", //tengo que arreglar esto
              email: profile._json?.email,
              password: "GenerarPassHasheadaRandom", //y esto
            };
            let newUser = await userManager.addUser(
              addNewUser.first_name,
              addNewUser.last_name,
              addNewUser.email,
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

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    //let user = await userManager.checkUserID(user._id);
    done(null, user);
  });
};

module.exports = initializePassport;
