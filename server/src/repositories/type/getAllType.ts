import { getConnection } from "typeorm";
import { Type } from "./../../entities/Type";
import { ITypesResponse } from "./../../models/TypesResponse";

export const getAllType = async (): Promise<ITypesResponse> => {
    let types: any[];

    try {
        types = await getConnection()
            .getRepository(Type)
            .createQueryBuilder("type")
            .getMany();
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    return {
        result: true,
        data: types || [],
    };
};
