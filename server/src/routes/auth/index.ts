import { refreshTokenController } from './../../controllers/auth/refreshTokenController';
import { logoutController } from "./../../controllers/auth/logoutController";
import { checkJwt } from "./../../middlewares/checkJwt";
import { registerController } from "./../../controllers/auth/registerController";
import { loginController } from "./../../controllers/auth/loginController";
import express from "express";

const router = express.Router();

// Login | Public
router.post("/login", loginController);

// Register | Public
router.post("/register", registerController);

// Logout | Authenticated
router.delete("/logout", checkJwt, logoutController);

// Refresher token | Public
router.post("/refresh-token", refreshTokenController);

export default router;
