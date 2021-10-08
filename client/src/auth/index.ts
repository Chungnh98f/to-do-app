const tokenKey = "ACCESS_TOKEN";
const refreshTokenKey = "REFRESH_TOKEN";

export const sessionToken: sessionTokenInterface = {
    getToken() {
        return window.sessionStorage.getItem(tokenKey) || "";
    },
    setToken(token) {
        window.sessionStorage.setItem(tokenKey, token);
    },
    clearToken() {
        window.sessionStorage.removeItem(tokenKey);
    },
};

export const localToken: sessionTokenInterface = {
    getToken() {
        return window.localStorage.getItem(refreshTokenKey) || "";
    },
    setToken(token) {
        window.localStorage.setItem(refreshTokenKey, token);
    },
    clearToken() {
        window.localStorage.removeItem(refreshTokenKey);
    },
};

interface sessionTokenInterface {
    getToken(): string;

    setToken(token: string): void;

    clearToken(): void;
}
