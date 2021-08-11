import { IResponse } from "./Response";

export interface ILoginResult extends IResponse {
    accessToken?: string;
    refreshToken?: string;
}
