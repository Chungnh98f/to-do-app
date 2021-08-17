import { isAdmin } from "./../../middlewares/isAdmin";
import { checkRefreshToken } from "./../../middlewares/checkRefreshToken";
import { authMeController } from "./../../controllers/auth/authMeController";
import { refreshTokenController } from "./../../controllers/auth/refreshTokenController";
import { logoutController } from "./../../controllers/auth/logoutController";
import { checkJwt } from "./../../middlewares/checkJwt";
import { registerController } from "./../../controllers/auth/registerController";
import { loginController } from "./../../controllers/auth/loginController";
import express from "express";

const router = express.Router();

// Login | Public
router.post("/login", loginController);

// Register | Public
router.post("/register", checkJwt, isAdmin, registerController);

// Refresher token | Public
router.post("/refresh-token", checkRefreshToken, refreshTokenController);

// Logout | Authenticated
router.delete("/logout", checkJwt, logoutController);

// Get me | Authenticated
router.get("/me", checkJwt, authMeController);

export default router;
