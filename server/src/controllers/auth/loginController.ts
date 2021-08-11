import { Request, Response } from "express";
import { loginService } from "./../../services/auth/login";
import { validateLogin } from "./../../utils/validateLogin";

export const loginController = async (req: Request, res: Response) => {
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
    const response = await loginService({ username, password });
    if (!response.result) {
        return res.status(401).send({
            message: response.errorMessage,
        });
    }

    return res.json({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
    });
};
