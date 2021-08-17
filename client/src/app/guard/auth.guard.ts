import { map } from 'rxjs/operators';
import { authSelector } from './../store/selectors/auth.selector';
import { AppState } from './../store/app.state';
import { ACCESS_TOKEN_LABEL } from './../constants/index';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(select(authSelector)).pipe(
      map((state) => {
        if (state.accessToken) {
          return true;
        }
        return this.router.createUrlTree(['auth', 'login']);
      })
    );
  }
}
