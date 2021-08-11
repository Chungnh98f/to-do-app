import { ILoginInput } from "./LoginInput";

export interface IRegisterInput extends ILoginInput {
    name: string;
}
