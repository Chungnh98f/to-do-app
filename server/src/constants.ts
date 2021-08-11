export const __prod__ = process.env.NODE_ENV === "production";
export const loginDurationTime = "30m";
export const redisLoginDurationTime = 30 * 60;
export const refresherTokenDurationTime = "24h";
export const redisRefresherTokenDurationTime = 60 * 60 * 24;
export const accessTokenLabel = "_access_token";
export const refreshTokenLabel = "_refresh_token";
