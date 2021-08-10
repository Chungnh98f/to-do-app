import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TutorialActions from '../../actions/tutorial.actions';
import { AppState } from '../../app.state';
import { ITutorial } from '../../models/tutorial.model';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  tutorials: Observable<ITutorial[]>;

  constructor(private store: Store<AppState>) {
    this.tutorials = store.select('tutorial');
  }

  removeTutorial(id: number | string) {
    this.store.dispatch(new TutorialActions.RemoveTutorial(Number(id)));
  }

  ngOnInit(): void {}
}
