import { Type } from "../entities/Type";
import { IResponse } from "./Response";

export interface ITypeResponse extends IResponse {
    data?: Type;
}
