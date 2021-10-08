import Axios, { AxiosRequestConfig } from "axios";
import { sessionToken } from "../auth";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const axiosInstance = Axios.create({
    baseURL: baseUrl,
});

export const axiosInstanceLogin = Axios.create({
    baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
    const _sessionToken = sessionToken.getToken();
    if (_sessionToken) {
        config.headers.Authorization = "Bearer " + _sessionToken;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            sessionToken.clearToken();
            window.location.reload();
        }
        return error.response;
    }
);

axiosInstanceLogin.interceptors.request.use(function (
    config: AxiosRequestConfig
) {
    return config;
});
axiosInstanceLogin.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return error.response;
    }
);
