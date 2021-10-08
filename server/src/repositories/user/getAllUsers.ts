import { getConnection } from "typeorm";
import { User } from "../../entities/User";
import { IUsersResponse } from "../../models/UserResponse";

export const getAllUsers = async (): Promise<IUsersResponse> => {
    let users: User[];

    try {
        users = await getConnection()
            .getRepository(User)
            .createQueryBuilder("user")
            .select(["user.username", "user.is_admin", "user.id", "user.email"])
            .getMany();
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    return {
        result: true,
        users: users || [],
    };
};
