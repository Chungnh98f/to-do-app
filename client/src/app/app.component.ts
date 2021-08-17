import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { last, take } from 'rxjs/operators';
import { REFRESH_TOKEN_LABEL } from './constants/index';
import {
  authMePending,
  refreshTokenPending,
} from './store/actions/auth.action';
import { AppState } from './store/app.state';
import { authSelector } from './store/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';
  name: string = '';
  loading: boolean = true;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    const refreshToken = window.localStorage.getItem(REFRESH_TOKEN_LABEL);
    if (refreshToken) {
      this.store.dispatch(refreshTokenPending({ refreshToken }));
      this.store
        .select(authSelector)
        .pipe(take(2), last())
        .subscribe((state) => {
          if (state.accessToken) {
            this.router.navigate(['']);
            this.store.dispatch(authMePending());
          } else {
            this.router.navigate(['auth']);
          }
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }
}
