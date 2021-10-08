import { ITypeInput } from "./../../models/TypeInput";
import { getRepository } from "typeorm";
import { Type } from "./../../entities/Type";
import { ITypeResponse } from "./../../models/TypeResponse";

export const updateType = async (input: ITypeInput): Promise<ITypeResponse> => {
    const { id, name } = input;
    const typeRepository = getRepository(Type);

    try {
        const type = await typeRepository.findOne(id);
        if (!type) {
            return {
                result: false,
                errorMessage: "Type not found",
            };
        }

        type.name = name;
        await typeRepository.save(type);
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
