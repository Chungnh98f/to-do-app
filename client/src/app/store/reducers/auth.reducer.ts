import { createReducer, on } from '@ngrx/store';
import { IAuthState } from './../../interface/auth.interface';
import {
  loginPending,
  loginSuccess,
  loginFailed,
  registerPending,
  registerFailed,
  registerSuccess,
  logoutPending,
  logoutSuccess,
  logoutFailed,
  refreshTokenSuccess,
  refreshTokenPending,
  refreshTokenFailed,
  authMePending,
  authMeSuccess,
  authMeFailed,
} from './../actions/auth.action';

export const authInitialState: IAuthState = {
  pending: false,
  refreshToken: '',
  accessToken: '',
  me: {},
};

export const authReducer = createReducer(
  authInitialState,
  // Login
  on(loginPending, (state) => ({ ...state, pending: true })),
  on(loginSuccess, (state, payload) => ({
    ...state,
    pending: false,
    refreshToken: payload.refreshToken,
    accessToken: payload.accessToken,
  })),
  on(loginFailed, (_) => ({ ...authInitialState })),
  // Register
  on(registerPending, (state, _) => ({ ...state, pending: true })),
  on(registerSuccess, (state, _) => ({ ...state, pending: false })),
  on(registerFailed, (state, _) => ({ ...state, pending: false })),
  // Logout
  on(logoutPending, (state, _) => ({ ...state, pending: true })),
  on(logoutSuccess, (state, _) => ({
    ...state,
    pending: false,
    refreshToken: '',
    accessToken: '',
    me: {},
  })),
  on(logoutFailed, (state, _) => ({ ...state, pending: false })),
  // Refresh token
  on(refreshTokenPending, (state, _) => ({ ...state, pending: true })),
  on(refreshTokenSuccess, (state, payload) => ({
    ...state,
    pending: false,
    refreshToken: payload.refreshToken,
    accessToken: payload.accessToken,
  })),
  on(refreshTokenFailed, (state, _) => ({ ...state, pending: false })),
  // Auth me
  on(authMePending, (state, _) => ({ ...state, pending: true })),
  on(authMeSuccess, (state, payload) => ({
    ...state,
    pending: false,
    me: payload,
  })),
  on(authMeFailed, (state, _) => ({ ...state, pending: false }))
);
