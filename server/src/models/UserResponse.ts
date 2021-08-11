import { User } from "../entities/User";
import { IResponse } from "./Response";

export interface IUserResponse extends IResponse {
    user?: User;
}
