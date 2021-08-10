import { ILoginInput } from "./LoginInput";

export interface IRegisterInput extends ILoginInput {
    email: string;
}
