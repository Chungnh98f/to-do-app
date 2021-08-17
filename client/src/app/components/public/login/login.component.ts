import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IAuthState } from './../../../interface/auth.interface';
import {
  loginPending,
  authMePending,
} from './../../../store/actions/auth.action';
import { AppState } from './../../../store/app.state';
import { authSelector } from './../../../store/selectors/auth.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  username = '';
  password = '';
  auth$: Observable<IAuthState>;
  authSub: any;
  constructor(private store: Store<AppState>, private router: Router) {
    this.auth$ = this.store.pipe(select(authSelector));
  }

  ngOnInit(): void {}

  login() {
    if (!this.username || !this.password) return;

    this.store.dispatch(
      loginPending({ username: this.username, password: this.password })
    );

    this.authSub = this.auth$.pipe(take(2)).subscribe((state) => {
      if (state.accessToken) {
        this.store.dispatch(authMePending());
        this.router.navigate(['dashboard']);
      }
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
