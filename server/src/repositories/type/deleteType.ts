import { getConnection } from "typeorm";
import { Type } from "./../../entities/Type";
import { ITypeResponse } from "./../../models/TypeResponse";

export const deleteType = async (id: number): Promise<ITypeResponse> => {
    try {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Type)
            .where("id = :id", { id })
            .execute();
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
