import { Dispatch } from "react";

export interface IActionType {
    type: string;
    payload?: any;
}

export interface IMe {
    [key: string]: any;
}

export interface IUser {
    email: string;
    id: number;
    is_admin: boolean;
    username: string;
}

export interface IStateInitialAuth {
    pending: boolean;
    refreshToken: string;
    accessToken: string;
    me: IMe;
    users: IUser[];
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface IRegisterInput extends ILoginInput {
    username: string;
    is_admin?: boolean;
}

export interface IResultMiddleware {
    result: boolean;
    message?: string;
    data?: any;
}

export interface IAuthContext {
    authState: IStateInitialAuth;
    dispatch: Dispatch<IActionType>;
}

export interface ITodoState {
    pending: boolean;
    userTodos: any[];
    allTodos: any[];
}

export interface ITodoContext {
    todoState: ITodoState;
    dispatch: Dispatch<IActionType>;
}

export interface ITypeState {
    pending: boolean;
    types: ITypeInput[];
}

export interface ITypeContext {
    typeState: ITypeState;
    dispatch: Dispatch<IActionType>;
}

export interface ITodoInput {
    id?: number;
    name?: string;
    content?: string;
    is_completed?: boolean;
    type?: number | any;
}

export interface ITypeInput {
    id?: number;
    name: string;
}
