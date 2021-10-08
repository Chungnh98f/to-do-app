import { IRegisterInput, IUser } from "../interface";
import { Dispatch } from "react";
import { localToken, sessionToken } from "../../auth";
import {
    getAllUsersFailed,
    getAllUsersPending,
    getAllUsersSuccess,
    getAuthFailed,
    getAuthPending,
    getAuthSuccess,
    getLoginFailed,
    getLoginPending,
    getLoginSuccess,
    getLogoutFailed,
    getLogoutPending,
    getLogoutSuccess,
    getRegisterFailed,
    getRegisterPending,
    getRegisterSuccess,
    refreshTokenFailed,
    refreshTokenPending,
    refreshTokenSuccess,
} from "../action/auth/actionCreator";

import {
    getAuthEffect,
    getLoginEffect,
    getLogoutEffect,
    refreshTokenEffect,
    getRegisterEffect,
    getAllUsersEffect,
    getRegisterByAdminEffect,
} from "../effect/auth";
import { IActionType, ILoginInput } from "../interface";

export const getAuth = async (dispatch: Dispatch<IActionType>) => {
    dispatch(getAuthPending());
    const res: any = await getAuthEffect();
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }

    if (res && res.status >= 200 && res.status <= 300) {
        const data = res?.data?.data;
        dispatch(getAuthSuccess(data || {}));
        return {
            result: true,
            message: notification || "Get Info Successfully",
            data,
        };
    }
    dispatch(getAuthFailed(notification));
    return {
        result: false,
        message: notification || "Cannot Get Authentication",
    };
};

export const getLogin = async (
    dispatch: Dispatch<IActionType>,
    data: ILoginInput
) => {
    dispatch(getLoginPending());
    const res: any = await getLoginEffect(data);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }
    if (res && res.status >= 200 && res.status <= 300) {
        const { refreshToken, accessToken } = res.data;
        sessionToken.setToken(accessToken);
        localToken.setToken(refreshToken);
        dispatch(getLoginSuccess({ accessToken, refreshToken } || {}));
        return {
            result: true,
            message: notification || "Login Successful",
        };
    }
    dispatch(getLoginFailed(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something Went Wrong",
    };
};

export const getLogout = async (dispatch: Dispatch<IActionType>) => {
    dispatch(getLogoutPending());
    const res: any = await getLogoutEffect();
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }

    if (res && res.status >= 200 && res.status <= 300) {
        sessionToken.clearToken();
        localToken.clearToken();
        dispatch(getLogoutSuccess());
        return {
            result: true,
            message: notification || "Sign Out Successfully",
        };
    }
    dispatch(getLogoutFailed(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Sign Out Failed",
    };
};

export const refreshToken = async (
    dispatch: Dispatch<IActionType>,
    refreshToken: string
) => {
    dispatch(refreshTokenPending());
    const res: any = await refreshTokenEffect(refreshToken);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }
    if (res && res.status >= 200 && res.status <= 300) {
        const { refreshToken, accessToken } = res.data;
        sessionToken.setToken(accessToken);
        localToken.setToken(refreshToken);
        dispatch(refreshTokenSuccess({ refreshToken, accessToken }));
        return {
            result: true,
            message: notification || "Refresh Token",
        };
    }
    sessionToken.clearToken();
    dispatch(refreshTokenFailed(notification || "Something went wrong"));
    return {
        result: false,
        message: notification || "Something Went Wrong",
    };
};

export const getRegister = async (
    dispatch: Dispatch<IActionType>,
    data: IRegisterInput
) => {
    dispatch(getRegisterPending());
    const res: any = await getRegisterEffect(data);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }

    if (res && res.status >= 200 && res.status <= 300) {
        dispatch(getRegisterSuccess());
        return {
            result: true,
            message: notification || "Sign Up Successfully",
        };
    }
    dispatch(getRegisterFailed(notification || "Cannot Create User"));
    return {
        result: false,
        message: notification || "Cannot Create User",
    };
};

export const getRegisterByAdmin = async (
    dispatch: Dispatch<IActionType>,
    data: IRegisterInput
) => {
    dispatch(getRegisterPending());
    const res: any = await getRegisterByAdminEffect(data);
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }

    if (res && res.status >= 200 && res.status <= 300) {
        dispatch(getRegisterSuccess());
        return {
            result: true,
            message: notification || "Sign Up Successfully",
        };
    }
    dispatch(getRegisterFailed(notification || "Cannot Create User"));
    return {
        result: false,
        message: notification || "Cannot Create User",
    };
};

export const getAllUsers = async (dispatch: Dispatch<IActionType>) => {
    dispatch(getAllUsersPending());
    const res: any = await getAllUsersEffect();
    let notification = res?.data?.message;
    if (typeof notification !== "string") {
        notification = JSON.stringify(notification);
    }

    if (res && res.status >= 200 && res.status <= 300) {
        const users = res.data.data.users as IUser[];

        dispatch(getAllUsersSuccess(users));
        return {
            result: true,
            message: notification || "Get All Users Successfully",
        };
    }
    dispatch(getAllUsersFailed(notification || "Cannot Get User"));
    return {
        result: false,
        message: notification || "Cannot Get User",
    };
};
