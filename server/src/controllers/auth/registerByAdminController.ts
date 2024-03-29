import { registerService } from "../../services/auth/register";
import { validateRegister } from "../../utils/validateRegister";
import { Request, Response } from "express";

export const registerByAdminController = async (
    req: Request,
    res: Response
) => {
    // Get data from request body
    let { username, password, email, is_admin } = req.body;

    // Validate data
    const validation = validateRegister({
        username,
        password,
        email,
        is_admin,
    });
    if (!validation.result) {
        return res.status(400).send({ message: validation.errorMessage });
    }

    const register = await registerService({
        username,
        password,
        email,
        is_admin,
    });

    if (!register.result) {
        return res.status(401).send({ message: register.errorMessage });
    }

    return res.status(201).send({ message: "User created" });
};
