import { ITypeResponse } from "src/models/TypeResponse";
import { ITypeInput } from "./../../models/TypeInput";
import { getTypeById } from "./../../repositories/type/getTypeById";
import { updateType } from "./../../repositories/type/updateType";

export const updateTypeService = async (
    input: ITypeInput
): Promise<ITypeResponse> => {
    const { id, name } = input;

    const typeMatch = await getTypeById(id!);
    if (!typeMatch.result) {
        return {
            result: false,
            errorMessage: typeMatch.errorMessage,
        };
    }

    const updateResponse = await updateType({ id, name });
    if (!updateResponse.result) {
        return {
            result: false,
            errorMessage: updateResponse.errorMessage,
        };
    }

    return {
        result: true,
    };
};
