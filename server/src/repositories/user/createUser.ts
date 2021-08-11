import { IRegisterInput } from "./../../models/RegisterInput";
import { IResponse } from "../../models/Response";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export const createUser = async (input: IRegisterInput): Promise<IResponse> => {
    const { username, password, name } = input;
    const userRepository = getRepository(User);
    let user = await userRepository.findOne({
        where: { username },
        select: ["username", "is_admin", "password", "id", "name"],
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
    user.name = name;
    user.is_admin = false;
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
