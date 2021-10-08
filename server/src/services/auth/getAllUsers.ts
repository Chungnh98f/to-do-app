import { IUsersResponse } from "./../../models/UserResponse";
import { getAllUsers } from "./../../repositories/user/getAllUsers";

export const getAllUsersService = async (): Promise<IUsersResponse> => {
    let userResponse = await getAllUsers();
    if (!userResponse.result) {
        return {
            result: false,
            errorMessage: userResponse.errorMessage,
        };
    }

    return {
        result: true,
        users: userResponse.users,
    };
};
