import { IAuthState } from './../../../interface/auth.interface';
import { authSelector } from './../../../store/selectors/auth.selector';
import { logoutPending } from './../../../store/actions/auth.action';
import { AppState } from './../../../store/app.state';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class TodoComponent implements OnInit {
  authSub: any;
  isAdmin$: Observable<IAuthState>;
  constructor(private store: Store<AppState>, private router: Router) {
    this.isAdmin$ = this.store.pipe(select(authSelector)).pipe(
      map((state) => {
        return state.me?.is_admin;
      })
    );
  }

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(logoutPending());
    this.authSub = this.store.pipe(select(authSelector)).subscribe((state) => {
      if (!state.accessToken) {
        this.router.navigate(['auth']);
      }
    });
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
