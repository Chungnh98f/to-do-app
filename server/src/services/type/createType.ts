import { ITypeInput } from "./../../models/TypeInput";
import { ITypeResponse } from "./../../models/TypeResponse";
import { createType } from "./../../repositories/type/createType";

export const createTypeService = async (
    input: ITypeInput
): Promise<ITypeResponse> => {
    const { name } = input;

    const response = await createType({ name });
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
