import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from './../store/app.state';
import { authSelector } from './../store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(select(authSelector)).pipe(
      map((state) => {
        console.log('guard');
        if (!state.accessToken) {
          return true;
        }
        return this.router.createUrlTree(['dashboard']);
      })
    );
  }
}
