import { IUserResponse } from "./../../models/UserResponse";
import { getUserById } from "./../../repositories/user/getUserById";

export const authMeService = async (userId: number): Promise<IUserResponse> => {
    let userResponse = await getUserById(userId);
    if (!userResponse.result) {
        return {
            result: false,
            errorMessage: userResponse.errorMessage,
        };
    }

    return {
        result: true,
        user: userResponse.user,
    };
};
