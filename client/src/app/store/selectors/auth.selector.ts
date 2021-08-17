import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { IAuthState } from './../../interface/auth.interface';

export const authSelector = createSelector(
  (state: AppState) => state.auth,
  (auth: IAuthState) => auth
);
