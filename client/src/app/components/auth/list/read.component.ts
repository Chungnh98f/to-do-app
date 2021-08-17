import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from '../../../store/app.state';
import { DialogComponent } from '../dialog/dialog.component';
import { ITutorial } from './../../../interface/todo.interface';
import {
  deleteTodoPending,
  getAllTodoPending,
  updateTodoPending,
} from './../../../store/actions/tutorial.actions';
import { todosSelector } from './../../../store/selectors/todo.selector';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  tutorials$: Observable<ITutorial[]>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.tutorials$ = store.pipe(select(todosSelector));
  }

  removeTutorial(id: number | string) {
    if (typeof Number(id) !== 'number' || !id) return;
    this.store.dispatch(deleteTodoPending({ id: Number(id) }));
  }

  toggleTutorial(id: number | string) {
    if (typeof Number(id) !== 'number' || !id) return;
    this.tutorials$.pipe(take(1)).subscribe((data) => {
      const item = data.find((item) => item.id === Number(id));
      if (!item) return;
      this.store.dispatch(
        updateTodoPending({
          name: item.name,
          is_completed: !item.is_completed,
          id: Number(id),
        })
      );
    });
  }

  openUpdateDialog(id: number | string, name: string) {
    if (typeof Number(id) !== 'number' || !id || !name) return;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        id,
        name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getAllTodoPending());
  }
}
