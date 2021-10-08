import { IActionType, IUser } from "../../interface";
import {
    AUTH_ME_ACTION,
    GET_ALL_USER_ACTION,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    REFRESH_TOKEN_ACTION,
    REGISTER_ACTION,
} from "./action";

// Login
export function getLoginPending(): IActionType {
    return {
        type: LOGIN_ACTION.LOGIN_PENDING,
    };
}

export function getLoginFailed(errorMsg: string): IActionType {
    return {
        type: LOGIN_ACTION.LOGIN_FAILURE,
        payload: errorMsg,
    };
}

export function getLoginSuccess(data: any): IActionType {
    return {
        type: LOGIN_ACTION.LOGIN_SUCCESS,
        payload: data,
    };
}

// Logout
export function getLogoutPending(): IActionType {
    return {
        type: LOGOUT_ACTION.LOGOUT_PENDING,
    };
}

export function getLogoutSuccess(): IActionType {
    return {
        type: LOGOUT_ACTION.LOGOUT_SUCCESS,
    };
}

export function getLogoutFailed(errorMsg: string): IActionType {
    return {
        type: LOGOUT_ACTION.LOGOUT_FAILURE,
        payload: errorMsg,
    };
}

// Authentication
export function getAuthPending(): IActionType {
    return {
        type: AUTH_ME_ACTION.AUTH_ME_PENDING,
    };
}

export function getAuthFailed(errorMsg: string): IActionType {
    return {
        type: AUTH_ME_ACTION.AUTH_ME_FAILURE,
        payload: errorMsg,
    };
}

export function getAuthSuccess(user: any): IActionType {
    return {
        type: AUTH_ME_ACTION.AUTH_ME_SUCCESS,
        payload: user,
    };
}

// Refresh token
export function refreshTokenPending(): IActionType {
    return {
        type: REFRESH_TOKEN_ACTION.REFRESH_TOKEN_PENDING,
    };
}

export function refreshTokenSuccess(data: any): IActionType {
    return {
        type: REFRESH_TOKEN_ACTION.REFRESH_TOKEN_SUCCESS,
        payload: data,
    };
}

export function refreshTokenFailed(errorMsg: string): IActionType {
    return {
        type: REFRESH_TOKEN_ACTION.REFRESH_TOKEN_FAILURE,
        payload: errorMsg,
    };
}

// Sign up
export function getRegisterPending(): IActionType {
    return {
        type: REGISTER_ACTION.REGISTER_PENDING,
    };
}

export function getRegisterSuccess(): IActionType {
    return {
        type: REGISTER_ACTION.REGISTER_SUCCESS,
    };
}

export function getRegisterFailed(errorMsg: string): IActionType {
    return {
        type: REGISTER_ACTION.REGISTER_FAILURE,
        payload: errorMsg,
    };
}

// Get all users
export function getAllUsersPending(): IActionType {
    return {
        type: GET_ALL_USER_ACTION.GET_ALL_USER_PENDING,
    };
}

export function getAllUsersSuccess(payload: IUser[]): IActionType {
    return {
        type: GET_ALL_USER_ACTION.GET_ALL_USER_SUCCESS,
        payload,
    };
}

export function getAllUsersFailed(errorMsg: string): IActionType {
    return {
        type: GET_ALL_USER_ACTION.GET_ALL_USER_FAILURE,
        payload: errorMsg,
    };
}
