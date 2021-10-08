import { ITypesResponse } from "./../../models/TypesResponse";
import { getAllType } from "./../../repositories/type/getAllType";

export const getAllTypeService = async (): Promise<ITypesResponse> => {
    const response = await getAllType();
    if (!response.result) {
        return {
            result: response.result,
            errorMessage: response.errorMessage,
        };
    }

    return {
        result: true,
        data: response.data,
    };
};
