import { axiosInstance, axiosInstanceLogin } from "../../config/axiosConfig";
import { ILoginInput, IRegisterInput } from "../interface";

export const getAuthEffect = async () => {
    try {
        return await axiosInstance.get("/auth/me");
    } catch (error) {
        return error;
    }
};

export const getLoginEffect = async (data: ILoginInput) => {
    try {
        return await axiosInstanceLogin.post("/auth/login", data);
    } catch (error) {
        return error;
    }
};

export const getLogoutEffect = async () => {
    try {
        return await axiosInstance.delete("/auth/logout", {});
    } catch (error) {
        return error;
    }
};

export const refreshTokenEffect = async (refreshToken: string) => {
    try {
        return await axiosInstance.post("/auth/refresh-token", {
            refreshToken,
        });
    } catch (error) {
        return error;
    }
};

export const getRegisterEffect = async (data: IRegisterInput) => {
    try {
        return await axiosInstanceLogin.post("/auth/register", data);
    } catch (error) {
        return error;
    }
};

export const getRegisterByAdminEffect = async (data: IRegisterInput) => {
    try {
        return await axiosInstance.post("/auth/register-by-admin", data);
    } catch (error) {
        return error;
    }
};

export const getAllUsersEffect = async () => {
    try {
        return await axiosInstance.get("/auth/users");
    } catch (error) {
        return error;
    }
};
