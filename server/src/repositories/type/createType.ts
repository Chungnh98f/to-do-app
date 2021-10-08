import { ITypeInput } from "./../../models/TypeInput";
import { getRepository } from "typeorm";
import { Type } from "./../../entities/Type";
import { ITypeResponse } from "./../../models/TypeResponse";

export const createType = async (input: ITypeInput): Promise<ITypeResponse> => {
    const { name } = input;
    const typeRepository = getRepository(Type);
    let type: Type = new Type();

    type.name = name;

    try {
        type = await typeRepository.save(type);
    } catch (err) {
        return {
            result: false,
            errorMessage: err,
        };
    }

    return {
        result: true,
        data: type,
    };
};
