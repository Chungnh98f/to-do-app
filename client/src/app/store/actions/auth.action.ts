import { IUserInput } from '../../interface/userInput';
import { ILoginResponse } from './../../interface/auth.interface';
import { IErrorResponse } from './../../interface/common.interface';
import { createAction, props } from '@ngrx/store';

const LOGIN_PENDING = '[AUTH] Login Pending';
const LOGIN_SUCCESS = '[AUTH] Login Success';
const LOGIN_FAILED = '[AUTH] Login Failed';

const REGISTER_PENDING = '[AUTH] Register Pending';
const REGISTER_SUCCESS = '[AUTH] Register Success';
const REGISTER_FAILED = '[AUTH] Register Failed';

const LOGOUT_PENDING = '[AUTH] Logout Pending';
const LOGOUT_SUCCESS = '[AUTH] Logout Success';
const LOGOUT_FAILED = '[AUTH] Logout Failed';

const REFRESH_TOKEN_PENDING = '[AUTH] Refresh Token Pending';
const REFRESH_TOKEN_SUCCESS = '[AUTH] Refresh Token Success';
const REFRESH_TOKEN_FAILED = '[AUTH] Refresh Token Failed';

const AUTH_ME_PENDING = '[AUTH] Auth me Pending';
const AUTH_ME_SUCCESS = '[AUTH] Auth me Success';
const AUTH_ME_FAILED = '[AUTH] Auth me Failed';

// Login
export const loginPending = createAction(LOGIN_PENDING, props<IUserInput>());

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<ILoginResponse>()
);

export const loginFailed = createAction(LOGIN_FAILED, props<IErrorResponse>());

// Register
export const registerPending = createAction(
  REGISTER_PENDING,
  props<IUserInput>()
);

export const registerSuccess = createAction(REGISTER_SUCCESS, props<any>());

export const registerFailed = createAction(
  REGISTER_FAILED,
  props<IErrorResponse>()
);

// Logout
export const logoutPending = createAction(LOGOUT_PENDING);

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const logoutFailed = createAction(
  LOGOUT_FAILED,
  props<IErrorResponse>()
);

// Refresh token
export const refreshTokenPending = createAction(
  REFRESH_TOKEN_PENDING,
  props<{ refreshToken: string }>()
);

export const refreshTokenSuccess = createAction(
  REFRESH_TOKEN_SUCCESS,
  props<ILoginResponse>()
);

export const refreshTokenFailed = createAction(
  REFRESH_TOKEN_FAILED,
  props<IErrorResponse>()
);

// Get me
export const authMePending = createAction(AUTH_ME_PENDING);

export const authMeSuccess = createAction(AUTH_ME_SUCCESS, props<any>());

export const authMeFailed = createAction(
  AUTH_ME_FAILED,
  props<IErrorResponse>()
);
