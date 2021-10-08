import { ILoginInput } from "./LoginInput";

export interface IRegisterInput extends ILoginInput {
    username: string;
    is_admin: boolean;
}
