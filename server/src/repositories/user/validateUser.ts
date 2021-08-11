import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { ILoginInput } from "../../models/LoginInput";
import { IUserResponse } from "../../models/UserResponse";

export const validateUser = async (
    input: ILoginInput
): Promise<IUserResponse> => {
    const { username, password } = input;

    const userRepository = getRepository(User);
    let user: User;

    try {
        user = await userRepository.findOneOrFail({
            where: { username },
            select: ["username", "is_admin", "password", "id", "name"],
        });
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return {
            result: false,
            errorMessage: "Invalid password",
        };
    }

    return {
        result: true,
        user,
    };
};
