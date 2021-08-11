import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { IUserResponse } from "../../models/UserResponse";

export const getUserById = async (id: number): Promise<IUserResponse> => {
    const userRepository = getRepository(User);
    let user: User;

    try {
        user = await userRepository.findOneOrFail({
            where: { id },
            select: ["username", "is_admin", "password", "id", "name"],
        });
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    return {
        result: true,
        user,
    };
};
