import { Router } from "express";
import passport from "passport";
import { logoutUserCtrl, loginUserCookieCtrl, currentUserCtrl } from "../controllers/users.controller.js";

const router = Router();

router.get("/logout", logoutUserCtrl)

router.post("/login", passport.authenticate('login', {
  failureRedirect: '/login',
  failureFlash: true,
  session: false,
}), loginUserCookieCtrl);

router.post("/register", passport.authenticate('register', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  session: false,
}));

router.get(
  "/github",
  passport.authenticate("github", { 
    scope: ["user:email"]})
);

router.get(
  "/github/callback",
  passport.authenticate("github", { 
    failureRedirect: "/login",
    session: false,
}), loginUserCookieCtrl);

router.get("/current", passport.authenticate("jwt", { session: false }), currentUserCtrl)

export default router;