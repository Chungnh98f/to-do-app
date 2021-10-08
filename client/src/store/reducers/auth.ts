import {
    AUTH_ME_ACTION,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    REFRESH_TOKEN_ACTION,
    REGISTER_ACTION,
    GET_ALL_USER_ACTION,
} from "../action/auth/action";
import { IActionType, IStateInitialAuth } from "./../interface";

export const initAuthState: IStateInitialAuth = {
    pending: false,
    refreshToken: "",
    accessToken: "",
    me: {},
    users: [],
};

export const authReducer = (
    state = initAuthState,
    action: IActionType
): IStateInitialAuth => {
    const { type, payload } = action;
    switch (type) {
        // Authentication
        case AUTH_ME_ACTION.AUTH_ME_PENDING:
        case GET_ALL_USER_ACTION.GET_ALL_USER_PENDING:
            return {
                ...state,
                pending: true,
            };
        case AUTH_ME_ACTION.AUTH_ME_FAILURE:
            return {
                ...state,
                pending: false,
            };
        case AUTH_ME_ACTION.AUTH_ME_SUCCESS:
            return {
                ...state,
                pending: false,
                me: payload,
            };
        case LOGIN_ACTION.LOGIN_PENDING:
            return {
                ...state,
                pending: true,
            };
        case LOGIN_ACTION.LOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
            };
        case LOGIN_ACTION.LOGIN_FAILURE:
            return {
                ...state,
                pending: false,
            };
        case REGISTER_ACTION.REGISTER_PENDING:
            return {
                ...state,
                pending: true,
            };
        case REGISTER_ACTION.REGISTER_SUCCESS:
            return {
                ...state,
                pending: false,
            };
        case REGISTER_ACTION.REGISTER_FAILURE:
        case GET_ALL_USER_ACTION.GET_ALL_USER_FAILURE:
            return {
                ...state,
                pending: false,
            };
        case LOGOUT_ACTION.LOGOUT_PENDING:
            return {
                ...state,
                pending: true,
            };
        case LOGOUT_ACTION.LOGOUT_SUCCESS:
            return { ...initAuthState };
        case LOGOUT_ACTION.LOGOUT_FAILURE:
            return {
                ...state,
                pending: false,
            };
        case REFRESH_TOKEN_ACTION.REFRESH_TOKEN_PENDING:
            return {
                ...state,
                pending: true,
            };
        case REFRESH_TOKEN_ACTION.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                pending: false,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken,
            };
        case REFRESH_TOKEN_ACTION.REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                accessToken: "",
                pending: false,
            };
        case GET_ALL_USER_ACTION.GET_ALL_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                users: payload,
            };
        default:
            return state;
    }
};
