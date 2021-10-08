import { deleteType } from "../../repositories/type/deleteType";
import { ITypeResponse } from "./../../models/TypeResponse";
import { getTypeById } from "./../../repositories/type/getTypeById";

export const deleteTypeService = async (id: number): Promise<ITypeResponse> => {
    const typeMatch = await getTypeById(id!);
    if (!typeMatch.result) {
        return {
            result: false,
            errorMessage: typeMatch.errorMessage,
        };
    }

    const deleteResponse = await deleteType(id!);
    if (!deleteResponse.result) {
        return {
            result: false,
            errorMessage: deleteResponse.errorMessage,
        };
    }

    return {
        result: true,
    };
};
