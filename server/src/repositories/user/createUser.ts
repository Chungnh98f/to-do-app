import { IRegisterInput } from "./../../models/RegisterInput";
import { IResponse } from "../../models/Response";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export const createUser = async (input: IRegisterInput): Promise<IResponse> => {
    const { username, password, email, is_admin } = input;
    const userRepository = getRepository(User);
    let user = await userRepository.findOne({
        where: { email },
        select: ["email", "is_admin", "password", "id", "username"],
    });
    if (user) {
        return {
            result: false,
            errorMessage: "user exists",
        };
    }

    user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.is_admin = is_admin;

    console.log(user);
    user.hashPassword();

    try {
        await userRepository.save(user);
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    return {
        result: true,
    };
};
