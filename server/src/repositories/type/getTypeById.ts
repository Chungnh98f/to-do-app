import { getRepository } from "typeorm";
import { Type } from "./../../entities/Type";
import { ITypeResponse } from "./../../models/TypeResponse";

export const getTypeById = async (id: number): Promise<ITypeResponse> => {
    const typeRepository = getRepository(Type);
    let type: Type;

    try {
        type = await typeRepository.findOneOrFail({
            where: { id },
        });
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
