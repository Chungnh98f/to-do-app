import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from './../store/app.state';
import { authSelector } from './../store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(select(authSelector)).pipe(
      map((state) => {
        if (state.me?.is_admin) {
          return true;
        }
        return false;
      })
    );
  }
}
