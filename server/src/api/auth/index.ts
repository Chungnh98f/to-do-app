import { loginService } from "./../../services/auth/login";
import { validateLogin } from "./../../utils/validateLogin";
import express from "express";

const router = express.Router();

// Login || Public
router.post("/login", (req, res) => {
    // Get data from request body
    const { username, password } = req.body;

    // Validate data
    const validation = validateLogin({ username, password });
    if (!validation.result) {
        return res.status(401).send({
            message: validation.errorMessage,
        });
    }

    // Query user and generate token
    const login = loginService({ username, password });
    if (!login.result) {
        return res.status(401).send({
            message: login.errorMessage,
        });
    }

    return res.json({
        accessToken: login.accessToken,
        refreshToken: login.refreshToken,
    });
});

// Register
router.post("/register", (req, res) => {});

// Logout
router.get("/logout", (req, res) => {});

// Refresher token
router.post("/refresh-token", (req, res) => {});

export default router;
