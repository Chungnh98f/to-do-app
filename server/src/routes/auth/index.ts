import { getAllUsersController } from './../../controllers/auth/getAllUsersController';
import { registerByAdminController } from "./../../controllers/auth/registerByAdminController";
import { isAdmin } from "./../../middlewares/isAdmin";
import { checkRefreshToken } from "./../../middlewares/checkRefreshToken";
import { authMeController } from "./../../controllers/auth/authMeController";
import { refreshTokenController } from "./../../controllers/auth/refreshTokenController";
import { logoutController } from "./../../controllers/auth/logoutController";
import { checkJwt } from "./../../middlewares/checkJwt";
import { registerController } from "./../../controllers/auth/registerController";
import { loginController } from "./../../controllers/auth/loginController";
import express from "express";

import passport from "passport";
import dotenv from "dotenv";
import strategy from "passport-facebook";
import { User } from "../../entities/User";

dotenv.config();

const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj: false | User | null | undefined, done) {
    done(null, obj);
});

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID || "1",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "1",
            callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:5050/api/auth/facebook/callback",
            profileFields: ["email", "name"],
        },
        function (accessToken, refreshToken, profile, done) {
            const { email, first_name, last_name } = profile._json;
            const userData = {
                email,
                username: `${first_name} ${last_name}`,
            };
            console.log(accessToken);
            console.log(refreshToken);
            console.log(userData);
            // new User(userData).save();
            done(null, profile);
        }
    )
);

const router = express.Router();

// Login | Public
router.post("/login", loginController);

// Register by admin
router.post("/register-by-admin", checkJwt, isAdmin, registerByAdminController);

// Register normal user | Public
router.post("/register", registerController);

// Refresher token | Public
router.post("/refresh-token", checkRefreshToken, refreshTokenController);

// Logout | Authenticated
router.delete("/logout", checkJwt, logoutController);

// Get all user | Authenticated
router.get("/users", checkJwt,isAdmin, getAllUsersController);

// Get me | Authenticated
router.get("/me", checkJwt, authMeController);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/fail",
    })
);

router.get("/fail", (_, res) => {
    res.send("Failed attempt");
});

router.get("/", (_, res) => {
    res.send("Success");
});

export default router;
