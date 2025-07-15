const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirecttUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.get("/signup",userController.renderSignup);

router.post(
    "/signup", 
    wrapAsync(userController.renderSignupForm)
);

router.get("/login",userController.renderLoginForm);

router.post(
    "/login", 
    saveRedirecttUrl,
    passport.authenticate("local", { 
        failureRedirect: "/login",
        failureFlash:true,
    }),
    userController.login  
);

router.get("/logout",userController.logout);

module.exports = router;