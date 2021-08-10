import { IValidationResponse } from "./ValidationResponse";

export interface ILoginResult extends IValidationResponse {
    accessToken?: string;
    refreshToken?: string;
}
