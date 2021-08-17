import { addTodoPending } from './../../../store/actions/tutorial.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  value = '';
  constructor(private store: Store<AppState>) {}

  addTutorial() {
    if (!this.value) return;
    const id = Math.random();
    const is_completed = false;
    const name = this.value;
    this.store.dispatch(addTodoPending({ name, is_completed, id }));
    this.value = '';
  }

  ngOnInit(): void {}
}
