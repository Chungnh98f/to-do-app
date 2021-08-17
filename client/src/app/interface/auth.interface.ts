import { IState } from './common.interface';
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthState extends IState, ILoginResponse {
  me: any;
}

