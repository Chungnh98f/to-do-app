import { registerPending } from './../../../store/actions/auth.action';
import { AppState } from './../../../store/app.state';
import { Component, OnInit } from '@angular/core';
import { AuthHttpService } from './../../../service/auth-http.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  username = '';
  password = '';
  name = '';
  isAdmin = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  register() {
    if (!this.username || !this.password || !this.name) return;

    const user = {
      username: this.username,
      name: this.name,
      password: this.password,
      is_admin: this.isAdmin,
    };

    this.store.dispatch(registerPending(user));
  }
}
