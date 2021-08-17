import { updateTodoPending } from './../../../store/actions/tutorial.actions';
import { todosSelector } from './../../../store/selectors/todo.selector';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  id: string | number;
  name: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<AppState>
  ) {
    this.id = data.id;
    this.name = data.name;
  }

  updateTutorial() {
    const id = this.id;
    if (typeof Number(id) !== 'number' || !id || !this.name) return;
    this.store
      .pipe(select(todosSelector))
      .pipe(take(1))
      .subscribe((data) => {
        const item = data.find((item) => item.id === Number(id));
        if (!item) return;

        this.store.dispatch(
          updateTodoPending({
            name: this.name,
            is_completed: item.is_completed,
            id: Number(id),
          })
        );
      });
  }

  ngOnInit(): void {}
}
