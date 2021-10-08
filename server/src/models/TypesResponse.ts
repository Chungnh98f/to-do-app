import { Type } from "../entities/Type";
import { IResponse } from "./Response";

export interface ITypesResponse extends IResponse {
    data?: Type[];
}
